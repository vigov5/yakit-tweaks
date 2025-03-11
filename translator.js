window.Translator = class Translator {
    constructor() {
        this.isTranslated = false;
        this.currentTargetLang = null;
        this.isTranslating = false;

        this.translationService = translationService;

        // Initialize UI controls
        this.controls = new TranslationControls(
            (sourceLang) => this.handleSourceLanguageChange(sourceLang),
            (sourceLang, targetLang, isRestore) => this.handleTranslateClick(sourceLang, targetLang, isRestore)
        );
    }

    handleSourceLanguageChange(sourceLang) {
        if (this.isTranslated) {
            this.restorePage();
        }
    }

    async handleTranslateClick(sourceLang, targetLang, isRestore) {
        if (isRestore) {
            this.restorePage();
            this.isTranslated = false;
            this.currentTargetLang = null;
            this.controls.setButtonState(false, false);
        } else {
            this.currentTargetLang = targetLang;
            await this.translatePage(sourceLang, targetLang);
            this.isTranslated = true;
            this.controls.setButtonState(true, false);
        }
    }

    async translatePage(sourceLang, targetLang) {
        if (!document.body || !targetLang) return;

        pageTranslator.translatePage(sourceLang, targetLang);
    }

    restorePage() {
        pageTranslator.restorePage();
    }
};

// Auto-initialize when script is loaded
if (typeof window.__translator === 'undefined') {
    window.__translator = new Translator();
}
