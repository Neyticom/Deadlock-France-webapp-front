import database from '../src/models/index';

(async () => {
    const transaction = await database.sequelize.transaction();
    try {
        await database.sequelize.truncate({cascade: true})
        .then( async () => {
            console.log("✅ All tables have been cleared ...");
        })

        await database.Role.bulkCreate([
            { name: 'Admin', weight: 100 },
            { name: 'User', weight: 10 }
        ], { transaction });

        await database.User.bulkCreate([
            { login: 'admin', password: '$2b$12$J4YVRI/9hEV/rbHZUWxZi.VBY46SovpZ0elVkOxgNTHUqNtLKZNZK', firstname: 'Admin', lastname: 'User', nickname: 'Admin123', email: 'admin@example.com', "2fa": true }, // MonMotDePasse123
            { login: 'johndoe', password: '$2b$12$s.BHo8IbK.WeDGPop6DHbu7jCjyUnOL38cF4SRXlg1k7RLVZHilfS', firstname: 'John', lastname: 'Doe', nickname: 'Johnny', email: 'john.doe@example.com', "2fa": false } // MonMotDePasse321
        ], { transaction });
    
        await database.UserHasRole.bulkCreate([
            { user_id: 1, role_id: 1 },
            { user_id: 2, role_id: 2 }
        ], { transaction });
    
        await database.Patchnote.bulkCreate([
            { version: '1.0.0', title: 'Initial Release', date: Date.now(), author: 'Admin123', content: 'First release notes content.', state: 'PUBLISHED' },
            { version: '1.1.0', title: 'Update Patch', date: Date.now() - 86400000, author: 'Johnny', content: 'Bug fixes and performance improvements.', state: 'DRAFT' }
        ], { transaction });
    
        await database.Hero.bulkCreate([
            { name: 'Hero 1', resume: 'Hero 1 resume', description: 'Description of Hero 1.', img_path: '/images/hero1.png', video_path: '/videos/hero1.mp4' },
            { name: 'Hero 2', resume: 'Hero 2 resume', description: 'Description of Hero 2.', img_path: '/images/hero2.png', video_path: '/videos/hero2.mp4' }
        ], { transaction });
    
        await database.Spell.bulkCreate([
            { name: 'Fireball', hero_id: 1, order: 1, description: 'Fireball description.', passive: false, charge: true, cooldown: 10, distance: 'Range: 15m', icon_path: '/icons/fireball.png' }
        ], { transaction });
    
        await database.SpellEffect.bulkCreate([
            { spell_id: 1, order: 1, effect: 'Deals 50 damage to all enemies.' },
            { spell_id: 1, order: 2, effect: 'Burns enemies for 5 seconds.' }
        ], { transaction });
    
        await database.Item.bulkCreate([
            { name: 'Sword of Destiny', category: 'WEAPON', cost: 1500, common_bonus: 10, active_description: 'Increases attack speed.', active_duration: 30, passive_description: 'Permanent damage bonus.', passive_duration: 0, parent_id: null },
            { name: 'Magic Amulet', category: 'VITALITY', cost: 1200, common_bonus: 20, active_description: 'Grants a shield.', active_duration: 15, passive_description: 'Increases health regeneration.', passive_duration: 0, parent_id: null }
        ], { transaction });
    
        await database.ItemEffect.bulkCreate([
            { item_id: 1, type: 'COMMON', effect: 'Bonus +10 attack.' },
            { item_id: 2, type: 'ACTIVE', effect: 'Grants 200 shield points.' }
        ], { transaction });
    
        await database.PatchnoteEntry.bulkCreate([
            { patchnote_id: 1, category: 'BUFF', ressource_type: 'SPELL', ressource_id: 1, position: 1, description: 'Increased fireball damage by 10%.' },
            { patchnote_id: 2, category: 'FIX', ressource_type: 'ITEM', ressource_id: 1, position: 1, description: 'Resolved texture clipping issue with Sword of Destiny.' },
            { patchnote_id: 2, category: 'FIX', ressource_type: 'ITEM', ressource_id: 1, position: 2, description: 'Resolved texture clipping issue with Sword of Destiny.' },
            { patchnote_id: 2, category: 'FIX', ressource_type: 'ITEM', ressource_id: 2, position: 3, description: 'Resolved texture clipping issue with Sword of Destiny.' },
            { patchnote_id: 2, category: 'FIX', ressource_type: 'ITEM', ressource_id: 3, position: 4, description: 'Resolved texture clipping issue with Sword of Destiny.' },
            { patchnote_id: 2, category: 'FIX', ressource_type: 'HERO', ressource_id: 3, position: 5, description: 'Herolerorololo.' },
            { patchnote_id: 2, category: 'FIX', ressource_type: 'SPELL', ressource_id: 1, position: 6, description: 'Lesortilegelailestvraimenttréforre' },
            { patchnote_id: 2, category: 'FIX', ressource_type: 'HERO', ressource_id: 1, position: 7, description: 'AAAHluiClehéroquitudefouuu' },
        ], { transaction });
    
        await database.Keyword.bulkCreate([
            { ressource_type: 'HERO', ressource_id: 1, value: 'Tank' },
            { ressource_type: 'SPELL', ressource_id: 1, value: 'Fire' },
            { ressource_type: 'ITEM', ressource_id: 1, value: 'Weapon' }
        ], { transaction });
    
        await database.Log.bulkCreate([
            { action: 'LOGIN', context: 'User logged in.', user_id: 1, ip: '192.168.1.1' },
            { action: 'CREATE', context: 'Patchnote created.', user_id: 2, ip: '192.168.1.2' }
        ], { transaction });
    
        await database.Statistic.bulkCreate([
            { origin: 'Homepage', count: 120, date: Date.now() , type: 'VIEW' },
            { origin: 'Patchnotes', count: 45, date: Date.now() - 86400000 * 2, type: 'CLICK' }
        ], { transaction });
    
        await database.Setting.bulkCreate([
            { key: 'homepage_url', value: 'https://example.com', type: 'URL' },
            { key: 'max_upload_size', value: '10485760', type: 'TEXT' },
            { key: 'default_avatar_path', value: '/images/default_avatar.png', type: 'PATH' }
        ], { transaction });

        await transaction.commit();
        console.log("✅ Seeding completed successfully");

    } catch (error) {
        console.error("❌ Error while seeding :", error);
        await transaction.rollback();
    }

})();