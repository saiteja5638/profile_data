sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'liststyle/test/integration/FirstJourney',
		'liststyle/test/integration/pages/CHAR_NUMVAL1List',
		'liststyle/test/integration/pages/CHAR_NUMVAL1ObjectPage'
    ],
    function(JourneyRunner, opaJourney, CHAR_NUMVAL1List, CHAR_NUMVAL1ObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('liststyle') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheCHAR_NUMVAL1List: CHAR_NUMVAL1List,
					onTheCHAR_NUMVAL1ObjectPage: CHAR_NUMVAL1ObjectPage
                }
            },
            opaJourney.run
        );
    }
);