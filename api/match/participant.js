class Participant {
    constructor(data, index, team) {
        const player = data.info.participants[index];

        this.id = player.summonerId;
        this.puuid = player.puuid;
        this.name = player.summonerName;
        this.profileIcon = player.profileIcon;
        this.summonerLevel = player.summonerLevel;
        this.lane = player.lane;
        this.teamPosition = player.teamPosition;
        this.timePlayed = player.timePlayed;
        this.kills = player.kills;
        this.assists = player.assists;
        this.deaths = player.deaths;
        this.championName = player.championName;
        this.championId = player.championId;
        this.champLevel = player.champLevel;
        this.damageDealtToBuildings = player.damageDealtToBuildings;
        this.damageDealtToObjectives = player.damageDealtToObjectives;
        this.damageDealtToTurrets = player.damageDealtToTurrets;
        this.damageSelfMitigated = player.damageSelfMitigated;
        this.firstBloodKill = player.firstBloodKill;
        this.firstBloodAssist = player.firstBloodAssist;
        this.firstTowerKill = player.firstTowerKill;
        this.firstTowerAssist = player.firstTowerAssist;
        this.inhibitorKills = player.inhibitorKills;
        this.inhibitorTakedowns = player.inhibitorTakedowns;
        this.turretKills = player.turretKills;
        this.turretTakedowns = player.turretTakedowns;
        this.turretsLost = player.turretsLost;
        this.inhibitorsLost = player.inhibitorsLost;
        this.goldEarned = player.goldEarned;
        this.goldSpent = player.goldSpent;
        this.killingSprees = player.killingSprees;
        this.largestKillingSpree = player.largestKillingSpree;
        this.largestMultiKill = player.largestMultiKill;
        this.longestTimeSpentLiving = player.longestTimeSpentLiving;
        this.physicalDamageDealt = player.physicalDamageDealt;
        this.physicalDamageDealtToChampions = player.physicalDamageDealtToChampions;
        this.physicalDamageTaken = player.physicalDamageTaken;
        this.magicDamageDealt = player.magicDamageDealt;
        this.magicDamageDealtToChampions = player.magicDamageDealtToChampions;
        this.magicDamageTaken = player.magicDamageTaken;
        this.trueDamageDealt = player.trueDamageDealt;
        this.trueDamageDealtToChampions = player.trueDamageDealtToChampions;
        this.trueDamageTaken = player.trueDamageTaken;
        this.totalDamageDealt = player.totalDamageDealt;
        this.totalDamageDealtToChampions = player.totalDamageDealtToChampions;
        this.totalDamageShieldedOnTeammates = player.totalDamageShieldedOnTeammates;
        this.totalDamageTaken = player.totalDamageTaken;
        this.totalHeal = player.totalHeal;
        this.totalUnitsHealed = player.totalUnitsHealed;
        this.totalHealsOnTeammates = player.totalHealsOnTeammates;
        this.totalTimeSpentDead = player.totalTimeSpentDead;
        this.totalTimeCCDealt = player.totalTimeCCDealt;
        this.totalMinionsKilled = player.totalMinionsKilled;
        this.neutralMinionsKilled = player.neutralMinionsKilled;
        this.baronKills = player.baronKills;
        this.objectivesStolen = player.objectivesStolen;
        this.objectivesStolenAssists = player.objectivesStolenAssists;
        this.doubleKills = player.doubleKills;
        this.tripleKills = player.tripleKills;
        this.quadraKills = player.quadraKills;
        this.pentaKills = player.pentaKills;
        this.summoner1Id = player.summoner1Id;
        this.summoner2Id = player.summoner2Id;
        this.items = [
            player.item0,
            player.item1,
            player.item2,
            player.item3,
            player.item4,
            player.item5,
            player.item6,
        ]
        this.itemsPurchased = player.itemsPurchased;
        this.runes = player.perks;
        this.visionScore = player.visionScore;
        this.visionWardsBoughtInGame = player.visionWardsBoughtInGame;
        this.wardsKilled = player.wardsKilled;
        this.wardsPlaced = player.wardsPlaced;
        this.win = player.win;
        this.team = team;
        this.assets = team.match.assets;
    }

    getProfileIcon() {
        return `http://ddragon.leagueoflegends.com/cdn/12.8.1/img/profileicon/${this.profileIcon}.png`;
    }

    getChampionIcon() {
        return `http://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/${this.championName}.png`;
    }

    getSummonerSpells() {
        let images = [];
        const summoner1 = Object.values(this.assets.summoner.data).find(summoner => summoner.key == `${this.summoner1Id}`);
        images.push(`http://ddragon.leagueoflegends.com/cdn/12.8.1/img/spell/${summoner1.id}.png`)
        const summoner2 = Object.values(this.assets.summoner.data).find(summoner => summoner.key == `${this.summoner2Id}`);
        images.push(`http://ddragon.leagueoflegends.com/cdn/12.8.1/img/spell/${summoner2.id}.png`)
        return images;
    }

    getItems() {
        let images = [];
        this.items.forEach(itemId => {
            images.push(`http://ddragon.leagueoflegends.com/cdn/12.8.1/img/item/${itemId}.png`);
        });
        return images;
    }

    getRunes() {
        let images = [];
        this.runes.styles.forEach(tree => {
            tree.selections.forEach(rune => {
                images.push(this.getRuneName(rune.perk))
            });
        });
        images.push(this.getRuneName(this.runes.statPerks.flex));
        images.push(this.getRuneName(this.runes.statPerks.offense));
        images.push(this.getRuneName(this.runes.statPerks.defense));
        return images;
    }

    getRuneName(runeId) {
        for (let i = 0; i < this.assets.runes.length; i++) {
            let tree = this.assets.runes[i];
            for (let j = 0; j < tree.slots.length; j++) {
                let slots = tree.slots[j];
                for (let k = 0; k < slots.runes.length; k++) {
                    let rune = slots.runes[k];
                    if (rune.id == runeId)
                        return `https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/${tree.key}/${rune.key}/${rune.key}.png`;
                }
            }
        }
        switch (runeId) {
            case 5001:
                return "https://raw.communitydragon.org/10.1/game/assets/perks/statmods/statmodshealthscalingicon.png";
            case 5002:
                return "https://raw.communitydragon.org/10.1/game/assets/perks/statmods/statmodsarmoricon.png";
            case 5003:
                return "https://raw.communitydragon.org/10.1/game/assets/perks/statmods/statmodsmagicresicon.png";
            case 5005:
                return "https://raw.communitydragon.org/10.1/game/assets/perks/statmods/statmodsattackspeedicon.png";
            case 5007:
                return "https://raw.communitydragon.org/10.1/game/assets/perks/statmods/statmodscdrscalingicon.png";
            default:
                return "https://raw.communitydragon.org/10.1/game/assets/perks/statmods/statmodsadaptiveforceicon.png";
          }
    }
}

module.exports = Participant;