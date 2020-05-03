export class Estimate {
    constructor(panelCount, quality, panels) {
        this.panelCount = panelCount;
        this.quality = quality;
        this.panels = panels;
    }
}
class Panel {
    constructor(bgComplexity, charCount, windowCount, animatedCount, characters) {
        this.bgComplexity = bgComplexity;
        this.charCount = charCount;
        this.windowCount = windowCount;
        this.animatedCount = animatedCount;
        this.characters = characters;
    }
}
class Character {
    constructor(visibility) {
        this.visibility = visibility;
    }
}
//# sourceMappingURL=estimate.js.map