class liveParticipant {
    constructor(data, index, team) {
        const player = data.participants[index];

        this.summonerId = player.summonerId;
        this.name = player.summonerName;
        this.profileIcon = player.profileIconId;
        this.championId = player.championId;
        this.summoner1Id = player.spell1Id;
        this.summoner2Id = player.spell2Id;
        this.bot = player.bot;
        this.runes = player.perks;
        this.team = team;
        this.assets = team.match.assets;
    }

    getProfileIcon() {
        return `http://ddragon.leagueoflegends.com/cdn/12.8.1/img/profileicon/${this.profileIcon}.png`;
    }

    getChampionIcon() {
        return `http://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/${this.getChampionName(this.championId)}.png`;
    }

    getChampionName(championId) {
        return Object.values(this.assets.champions.data).find(champ => champ.key == `${championId}`).name;
    }

    getSummonerSpells() {
        let images = [];
        const summoner1 = Object.values(this.assets.summoner.data).find(summoner => summoner.key == `${this.summoner1Id}`);
        images.push(`http://ddragon.leagueoflegends.com/cdn/12.8.1/img/spell/${summoner1.id}.png`)
        const summoner2 = Object.values(this.assets.summoner.data).find(summoner => summoner.key == `${this.summoner2Id}`);
        images.push(`http://ddragon.leagueoflegends.com/cdn/12.8.1/img/spell/${summoner2.id}.png`)
        return images;
    }

    getRunes() {
        let images = [];
        this.runes.perkIds.forEach(rune => {
            images.push(this.getRuneName(rune))
        });
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

module.exports = liveParticipant;