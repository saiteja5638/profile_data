sap.ui.define(['sap/fe/test/ObjectPage'], function(ObjectPage) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ObjectPage(
        {
            appId: 'liststyle',
            componentId: 'CHAR_NUMVAL1ObjectPage',
            entitySet: 'CHAR_NUMVAL1'
        },
        CustomPageDefinitions
    );
});