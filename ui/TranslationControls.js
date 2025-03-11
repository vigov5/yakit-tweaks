window.TranslationControls = class TranslationControls {
    constructor(onSourceChange, onTranslateClick) {
        this.languages = ['en', 'es', 'fr', 'de', 'it', 'pt', 'ru', 'ja', 'ko', 'zh-CN', 'vi'];
        this.sourceLang = 'zh-CN';
        this.init(onSourceChange, onTranslateClick);
    }

    init(onSourceChange, onTranslateClick) {
        const controls = document.createElement('div');
        controls.className = 'notranslate';
        controls.style.cssText = `
            position: fixed;
            top: 45px;
            left: 650px;
            border-radius: 4px;
            font-family: Arial, sans-serif;
            display: flex;
            align-items: center;
            font-size: 14px;
            gap: 4px;
        `;

        const sourceSelect = this.createLanguageSelect(this.sourceLang);
        const targetSelect = this.createLanguageSelect('en');
        this.button = this.createTranslateButton();

        const arrow = document.createElement('span');
        arrow.className = 'notranslate';
        arrow.textContent = '→';
        arrow.style.margin = '0 2px';

        controls.appendChild(sourceSelect);
        controls.appendChild(arrow);
        controls.appendChild(targetSelect);
        controls.appendChild(this.button);
        document.body.appendChild(controls);

        sourceSelect.addEventListener('change', () => {
            this.sourceLang = sourceSelect.value;
            onSourceChange(sourceSelect.value);
        });

        this.button.addEventListener('click', async () => {
            const isTranslated = this.button.textContent === 'Original';
            if (!isTranslated) {
                this.sourceLang = sourceSelect.value;
                await onTranslateClick(sourceSelect.value, targetSelect.value, false);
            } else {
                await onTranslateClick(sourceSelect.value, targetSelect.value, true);
            }
        });
    }

    createLanguageSelect(defaultLang) {
        const select = document.createElement('select');
        select.className = 'notranslate';
        select.style.cssText = `
            padding: 2px;
            border: 1px solid #ddd;
            border-radius: 3px;
            width: 70px;
        `;

        this.languages.forEach(code => {
            const option = document.createElement('option');
            option.value = code;
            option.textContent = code;
            option.selected = code === defaultLang;
            select.appendChild(option);
        });

        return select;
    }

    createTranslateButton() {
        const button = document.createElement('button');
        button.textContent = 'Translate';
        button.style.cssText = `
            padding: 2px 2px;
            cursor: pointer;
            background: #4CAF50;
            color: white;
            border: none;
            border-radius: 4px;
            font-size: 14px;
            min-width: 80px;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 6px;
            position: relative;
            transition: opacity 0.2s ease;
        `;
        button.addEventListener('mouseover', () => {
            if (!button.disabled) {
                button.style.background = '#45a049';
            }
        });
        button.addEventListener('mouseout', () => {
            if (!button.disabled) {
                button.style.background = '#4CAF50';
            }
        });
        return button;
    }

    setButtonState(isTranslated, isLoading) {
        if (isLoading) {
            const existingSpinner = this.button.querySelector('.spinner-container');
            if (!existingSpinner) {
                const spinner = document.createElement('div');
                spinner.className = 'spinner-container';
                spinner.innerHTML = `
                    <svg width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <style>
                            @keyframes spin {
                                0% { transform: rotate(0deg); }
                                100% { transform: rotate(360deg); }
                            }
                            .spinner {
                                animation: spin 1s linear infinite;
                                transform-origin: center;
                            }
                        </style>
                        <circle class="spinner" cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="3" stroke-dasharray="30 60"/>
                    </svg>
                `;
                spinner.style.cssText = `
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                `;
                this.button.textContent = 'Translating';
                this.button.appendChild(spinner);
            }
            this.button.disabled = true;
            this.button.style.opacity = '0.8';
            this.button.style.cursor = 'not-allowed';
        } else {
            this.button.disabled = false;
            this.button.style.opacity = '1';
            this.button.style.cursor = 'pointer';
            const spinner = this.button.querySelector('.spinner-container');
            if (spinner) {
                spinner.remove();
            }
            this.button.textContent = isTranslated ? 'Original' : 'Translate';
        }
    }
};