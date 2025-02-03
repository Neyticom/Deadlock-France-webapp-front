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
            { name: 'User', weight: 10 },
            { name: 'Moderator', weight: 50 },
            { name: 'Editor', weight: 30 },
            { name: 'Spectator', weight: 5 }
        ], { transaction });

        await database.User.bulkCreate([
            { login: 'admin', password: '$2b$12$J4YVRI/9hEV/rbHZUWxZi.VBY46SovpZ0elVkOxgNTHUqNtLKZNZK', firstname: 'Admin', lastname: 'User', nickname: 'Admin123', email: 'admin@example.com', "2fa": true }, // MonMotDePasse123
            { login: 'johndoe', password: '$2b$12$s.BHo8IbK.WeDGPop6DHbu7jCjyUnOL38cF4SRXlg1k7RLVZHilfS', firstname: 'John', lastname: 'Doe', nickname: 'Johnny', email: 'john.doe@example.com', "2fa": false }, // MonMotDePasse321
            { login: 'shadow', password: 'password_hash_4', firstname: 'Lena', lastname: 'Smith', nickname: 'ShadowFox', email: 'lena.smith@example.com', "2fa": true },
            { login: 'necromancer', password: 'password_hash_5', firstname: 'Victor', lastname: 'Grave', nickname: 'NecroLord', email: 'victor.grave@example.com', "2fa": false },
            { login: 'spectator1', password: 'password_hash_6', firstname: 'Mark', lastname: 'Watcher', nickname: 'Overseer', email: 'mark.watcher@example.com', "2fa": false }
        ], { transaction });
    
        await database.UserHasRole.bulkCreate([
            { user_id: 1, role_id: 1 },
            { user_id: 2, role_id: 2 },
            { user_id: 3, role_id: 3 },
            { user_id: 4, role_id: 4 },
            { user_id: 5, role_id: 5 }
        ], { transaction });
    
        await database.Patchnote.bulkCreate([
            { version: '1.0.0', title: 'Initial Release', date: Date.now(), author: 'Admin123', content: 'First release notes content.', state: 'PUBLISHED', img_path: '/images/patchnote_1.png', video_path: '/videos/patchnote_1.mp4', source: "https://patchnotes.deadlock-france.com/1.0.0" },
            { version: '1.1.0', title: 'Update Patch', date: Date.now() - 86400000, author: 'Johnny', content: 'Bug fixes and performance improvements.', state: 'DRAFT', img_path: '/images/patchnote_2.png', video_path: null, source: "https://patchnotes.deadlock-france.com/1.1.0" },
            { version: '3.2.0', title: 'New Features', date: Date.now() - 172800000, author: 'ShadowFox', content: 'Major gameplay changes.', state: 'ARCHIVED', img_path: '/images/patchnote_3.png', video_path: '/videos/patchnote_15.mp4', source: "https://patchnotes.deadlock-france.com/3.2.0" },
            { version: '4.3.0', title: 'Balancing Update', date: Date.now() - 259200000, author: 'NecroLord', content: 'Rebalancing of characters.', state: 'DRAFT', img_path: '/images/patchnote_4.png', video_path: null, source: "https://patchnotes.deadlock-france.com/4.3.0" }
        ], { transaction });        
    
        await database.Hero.bulkCreate([
            { name: 'Hero 1', resume: 'Hero 1 resume', description: 'Description of Hero 1.', img_path: '/images/hero1.png', video_path: '/videos/hero1.mp4' },
            { name: 'Hero 2', resume: 'Hero 2 resume', description: 'Description of Hero 2.', img_path: '/images/hero2.png', video_path: '/videos/hero2.mp4' },
            { name: 'Necromancer', resume: 'Master of the undead.', description: 'Summons skeletal minions to fight.', img_path: '/images/necromancer.png', video_path: '/videos/necromancer.mp4' },
            { name: 'Shadow Assassin', resume: 'A deadly shadow warrior.', description: 'Moves unseen and strikes critically.', img_path: '/images/shadow_assassin.png', video_path: null }
        ], { transaction });
    
        await database.Spell.bulkCreate([
            { name: 'Fireball', hero_id: 1, order: 1, description: 'Fireball description.', passive: false, charge: true, cooldown: 10, distance: 'Range: 15m', icon_path: '/icons/fireball.png' },
            { name: 'Dark Surge', hero_id: 3, order: 1, description: 'Unleashes a wave of dark energy.', passive: false, charge: true, cooldown: 12, distance: 'Range: 20m', icon_path: '/icons/dark_surge.png' },
            { name: 'Shadow Strike', hero_id: 2, order: 2, description: 'A swift attack from the shadows, dealing critical damage.', passive: false, charge: false, cooldown: 8, distance: 'Melee', icon_path: '/icons/shadow_strike.png' },
            { name: 'Necrotic Blast', hero_id: 4, order: 2, description: 'Emits a blast of necrotic energy, damaging all enemies in a radius.', passive: false, charge: false, cooldown: 15, distance: 'Range: 10m', icon_path: '/icons/necrotic_blast.png' }        
        ], { transaction });
    
        await database.SpellEffect.bulkCreate([
            { spell_id: 1, order: 1, effect: 'Deals 50 damage to all enemies.' },
            { spell_id: 1, order: 2, effect: 'Burns enemies for 5 seconds.' },
            { spell_id: 3, order: 1, effect: 'Strikes a single target for 75 critical damage.' },
            { spell_id: 4, order: 1, effect: 'Reduces enemy armor by 10% for 6 seconds.' }        
        ], { transaction });
    
        await database.Item.bulkCreate([
            { name: 'Sword of Destiny', category: 'WEAPON', cost: 1500, common_bonus: 10, active_description: 'Increases attack speed.', active_duration: 30, passive_description: 'Permanent damage bonus.', passive_duration: 0, parent_id: null },
            { name: 'Magic Amulet', category: 'VITALITY', cost: 1200, common_bonus: 20, active_description: 'Grants a shield.', active_duration: 15, passive_description: 'Increases health regeneration.', passive_duration: 0, parent_id: null },
            { name: 'Phantom Dagger', category: 'WEAPON', cost: 2000, common_bonus: 15, active_description: 'Allows the user to teleport behind an enemy.', active_duration: 0, passive_description: 'Increases critical hit rate.', passive_duration: 0, parent_id: null },
            { name: 'Guardian Orb', category: 'SPIRIT', cost: 1800, common_bonus: 25, active_description: 'Creates a protective barrier absorbing damage.', active_duration: 10, passive_description: 'Boosts mana regeneration.', passive_duration: 0, parent_id: null }        
        ], { transaction });
    
        await database.ItemEffect.bulkCreate([
            { item_id: 1, type: 'COMMON', effect: 'Bonus +10 attack.' },
            { item_id: 2, type: 'ACTIVE', effect: 'Grants 200 shield points.' },
            { item_id: 3, type: 'PASSIVE', effect: 'Increases critical hit rate by 5%.' },
            { item_id: 4, type: 'ACTIVE', effect: 'Absorbs up to 300 damage for 10 seconds.' }
        ], { transaction });        
    
        await database.PatchnoteEntry.bulkCreate([
            // Patchnote 1.0.0 - Initial Release
            { patchnote_id: 1, category: 'BUFF', ressource_type: 'SPELL', ressource_id: 1, position: 1, description: 'Increased fireball damage by 10%.' },
            { patchnote_id: 1, category: 'NERF', ressource_type: 'ITEM', ressource_id: 2, position: 2, description: 'Reduced shield duration from 15s to 12s.' },
            { patchnote_id: 1, category: 'CHANGE', ressource_type: 'HERO', ressource_id: 1, position: 3, description: 'Updated base health from 1000 to 1100.' },
            { patchnote_id: 1, category: 'FIX', ressource_type: 'SPELL', ressource_id: 1, position: 4, description: 'Fixed bug where Fireball could bypass obstacles.' },
            { patchnote_id: 1, category: 'BUFF', ressource_type: 'SPELL', ressource_id: 3, position: 5, description: 'Increased Dark Surge range from 20m to 25m.' },
            { patchnote_id: 1, category: 'CHANGE', ressource_type: 'ITEM', ressource_id: 3, position: 6, description: 'Phantom Dagger now increases movement speed by 5%.' },
            { patchnote_id: 1, category: 'NERF', ressource_type: 'HERO', ressource_id: 2, position: 7, description: 'Decreased attack power by 8%.' },
            { patchnote_id: 1, category: 'FIX', ressource_type: 'SPELL', ressource_id: 2, position: 8, description: 'Fixed animation desynchronization issue with Dark Surge.' },
            { patchnote_id: 1, category: 'BUFF', ressource_type: 'HERO', ressource_id: 1, position: 9, description: 'Increased stamina regeneration by 15%.' },
            { patchnote_id: 1, category: 'FIX', ressource_type: 'ITEM', ressource_id: 4, position: 10, description: 'Fixed incorrect tooltip for Guardian Orb shield value.' },
        
            // Patchnote 1.1.0 - Update Patch
            { patchnote_id: 2, category: 'FIX', ressource_type: 'ITEM', ressource_id: 1, position: 1, description: 'Resolved texture clipping issue with Sword of Destiny.' },
            { patchnote_id: 2, category: 'NERF', ressource_type: 'HERO', ressource_id: 2, position: 2, description: 'Reduced movement speed from 7.5 to 6.8.' },
            { patchnote_id: 2, category: 'CHANGE', ressource_type: 'SPELL', ressource_id: 1, position: 3, description: 'Adjusted cooldown from 10s to 9s for Fireball.' },
            { patchnote_id: 2, category: 'BUFF', ressource_type: 'ITEM', ressource_id: 3, position: 4, description: 'Increased crit rate bonus from 5% to 7% for Phantom Dagger.' },
            { patchnote_id: 2, category: 'CHANGE', ressource_type: 'SPELL', ressource_id: 2, position: 5, description: 'Dark Surge now scales with intelligence instead of agility.' },
            { patchnote_id: 2, category: 'FIX', ressource_type: 'HERO', ressource_id: 3, position: 6, description: 'Resolved hitbox issue causing inconsistent collision detection.' },
            { patchnote_id: 2, category: 'BUFF', ressource_type: 'ITEM', ressource_id: 4, position: 7, description: 'Guardian Orb now grants an additional 50 mana regeneration.' },
            { patchnote_id: 2, category: 'NERF', ressource_type: 'SPELL', ressource_id: 1, position: 8, description: 'Reduced burn duration from 5s to 4s for Fireball.' },
            { patchnote_id: 2, category: 'FIX', ressource_type: 'ITEM', ressource_id: 2, position: 9, description: 'Fixed UI display bug causing Magic Amulet to show incorrect cost.' },
            { patchnote_id: 2, category: 'CHANGE', ressource_type: 'HERO', ressource_id: 1, position: 10, description: 'Adjusted animation speed for ultimate ability.' },
        
            // Patchnote 3.2.0 - New Features
            { patchnote_id: 3, category: 'NERF', ressource_type: 'GLOBAL', ressource_id: null, position: 1, description: 'Added new hero: Shadow Reaper.' },
            { patchnote_id: 3, category: 'NERF', ressource_type: 'GLOBAL', ressource_id: null, position: 2, description: 'Introduced Legendary Equipment system.' },
            { patchnote_id: 3, category: 'BUFF', ressource_type: 'SPELL', ressource_id: 3, position: 3, description: 'Dark Surge damage increased by 20%.' },
            { patchnote_id: 3, category: 'CHANGE', ressource_type: 'ITEM', ressource_id: 3, position: 4, description: 'Phantom Dagger now has a visual glow effect.' },
            { patchnote_id: 3, category: 'FIX', ressource_type: 'SPELL', ressource_id: 4, position: 5, description: 'Fixed incorrect tooltip for Shadow Strike.' },
            { patchnote_id: 3, category: 'BUFF', ressource_type: 'ITEM', ressource_id: 4, position: 6, description: 'Guardian Orb now absorbs 50 more damage.' },
            { patchnote_id: 3, category: 'CHANGE', ressource_type: 'HERO', ressource_id: 2, position: 7, description: 'Adjusted skill progression tree for balance.' },
            { patchnote_id: 3, category: 'NERF', ressource_type: 'SPELL', ressource_id: 1, position: 8, description: 'Fireball cooldown increased to 11s.' },
            { patchnote_id: 3, category: 'FIX', ressource_type: 'ITEM', ressource_id: 1, position: 9, description: 'Corrected item rarity classification.' },
            { patchnote_id: 3, category: 'NERF', ressource_type: 'GLOBAL', ressource_id: null, position: 10, description: 'New ultimate abilities added for all heroes.' },
        
            // Patchnote 4.3.0 - Balancing Update
            { patchnote_id: 4, category: 'NERF', ressource_type: 'HERO', ressource_id: 2, position: 1, description: 'Reduced base damage by 5%.' },
            { patchnote_id: 4, category: 'BUFF', ressource_type: 'SPELL', ressource_id: 4, position: 2, description: 'Increased Shadow Strike damage by 15%.' },
            { patchnote_id: 4, category: 'FIX', ressource_type: 'ITEM', ressource_id: 2, position: 3, description: 'Fixed missing texture issue on Magic Amulet.' },
            { patchnote_id: 4, category: 'CHANGE', ressource_type: 'HERO', ressource_id: 3, position: 4, description: 'Adjusted movement animations for smoother transitions.' },
            { patchnote_id: 4, category: 'NERF', ressource_type: 'SPELL', ressource_id: 3, position: 5, description: 'Dark Surge mana cost increased by 10%.' },
            { patchnote_id: 4, category: 'BUFF', ressource_type: 'ITEM', ressource_id: 1, position: 6, description: 'Sword of Destiny now grants a +5 agility bonus.' },
            { patchnote_id: 4, category: 'CHANGE', ressource_type: 'SPELL', ressource_id: 2, position: 7, description: 'Fireball explosion radius reduced from 3m to 2.5m.' },
            { patchnote_id: 4, category: 'FIX', ressource_type: 'HERO', ressource_id: 1, position: 8, description: 'Fixed incorrect audio cue when using ultimate ability.' },
            { patchnote_id: 4, category: 'BUFF', ressource_type: 'HERO', ressource_id: 3, position: 9, description: 'Increased defense scaling by 7%.' },
            { patchnote_id: 4, category: 'NERF', ressource_type: 'GLOBAL', ressource_id: null, position: 10, description: 'New crafting system added for weapon upgrades.' }
        ], { transaction });
    
        await database.Keyword.bulkCreate([
            { ressource_type: 'HERO', ressource_id: 1, value: 'Tank' },
            { ressource_type: 'SPELL', ressource_id: 1, value: 'Fire' },
            { ressource_type: 'ITEM', ressource_id: 1, value: 'Weapon' },
            { ressource_type: 'HERO', ressource_id: 2, value: 'Assassin' },
            { ressource_type: 'SPELL', ressource_id: 3, value: 'Electric' },
            { ressource_type: 'ITEM', ressource_id: 2, value: 'Shield' }
        ], { transaction });
    
        await database.Log.bulkCreate([
            { action: 'LOGIN', context: 'User logged in.', user_id: 1, ip: '192.168.1.1' },
            { action: 'CREATE', context: 'Patchnote created.', user_id: 2, ip: '192.168.1.2' },
            { action: 'DELETE', context: 'User deleted a comment.', user_id: 3, ip: '192.168.1.3' },
            { action: 'EDIT', context: 'User updated profile information.', user_id: 4, ip: '192.168.1.4' }        
        ], { transaction });
    
        await database.Statistic.bulkCreate([
            { origin: 'Homepage', count: 120, date: Date.now() , type: 'VIEW' },
            { origin: 'Patchnotes', count: 45, date: Date.now() - 86400000 * 2, type: 'CLICK' },
            { origin: 'Hero Selection', count: 98, date: Date.now() - 86400000, type: 'VIEW' },
            { origin: 'Leaderboard', count: 67, date: Date.now() - 86400000 * 3, type: 'CLICK' },
            { origin: 'Item Database', count: 155, date: Date.now() - 86400000 * 4, type: 'VIEW' }        
        ], { transaction });
    
        await database.Setting.bulkCreate([
            { key: 'homepage_url', value: 'https://example.com', type: 'URL' },
            { key: 'max_upload_size', value: '10485760', type: 'TEXT' },
            { key: 'default_avatar_path', value: '/images/default_avatar.png', type: 'PATH' },
            { key: 'support_url', value: 'https://support.example.com', type: 'URL' },
            { key: 'session_timeout', value: '3600', type: 'TEXT' },
            { key: 'log_file_path', value: '/logs/server.log', type: 'PATH' }
        ], { transaction });

        await transaction.commit();
        console.log("✅ Seeding completed successfully");

    } catch (error) {
        console.error("❌ Error while seeding :", error);
        await transaction.rollback();
    }

})();