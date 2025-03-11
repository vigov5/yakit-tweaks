function addCssString(cssString) {
    let style = document.createElement("style");
    style.type = "text/css";
    style.appendChild(document.createTextNode(cssString));
    document.head.appendChild(style);
}

addCssString(`
:where(div[class^="HttpQueryAdvancedConfig_http-query-advanced-config"]) {
    max-width: 500px !important;
    min-width: 500px !important;
    width: 500px !important;
}

:where(div[class^="funcDomain_ui-op-plus-wrapper"]) {
    width: 600px !important;
}

:where(div[class^="MenuCodec_func-btn-body"]) {
    width: 100px !important;
}

:where(div[class^="MenuPlugin_plugin-header"]) {
    width: 60px !important;
}

:where(div[class^="funcTemplate_author-icon-wrapper"]) {
    width: 50px !important;
}

:where(div[class^="funcDomain_risk-footer-btn"]) {
    width: 70px !important;
}

:where(div[class^="funcDomain_risk-footer-btn"]) {
    width: 70px !important;
}

:where(div[class^="SoftwareSettings_opt-title"]) {
    width: 250px !important;
}

:where(div[class^="SoftwareSettings_left-body"]) {
    width: 320px !important;
}

div[class^="MITMServerHijacking_plugin-hijack-content-list"] div[class^="YakitRadioButtons_yakit-radio-buttons-solid"] {
    min-width: 270px !important;
}

:where(div[class^="YakitHint_yakit-hint-modal-container"]) {
    width: 600px !important;
}

:where(div[class^="FuzzerSequence_fuzzer-sequence-left"]) {
    width: 350px !important;
}
`);
