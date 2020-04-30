export class Estimate {
    constructor(
        public panelCount: number,
        public quality: string,
        public panels: Panel[]
    ){}
}

class Panel{
    constructor(
        public bgComplexity: string,
        public charCount: number,
        public windowCount: number,
        public animatedCount: number,
        public characters: Character[]
    ){}
}

class Character{
    constructor(
        public visibility: string
    ){}
}