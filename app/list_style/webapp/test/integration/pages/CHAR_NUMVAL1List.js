sap.ui.define(['sap/fe/test/ListReport'], function(ListReport) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ListReport(
        {
            appId: 'liststyle',
            componentId: 'CHAR_NUMVAL1List',
            entitySet: 'CHAR_NUMVAL1'
        },
        CustomPageDefinitions
    );
});