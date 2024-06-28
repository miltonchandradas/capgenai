sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'certificationsui/test/integration/FirstJourney',
		'certificationsui/test/integration/pages/CertificationsList',
		'certificationsui/test/integration/pages/CertificationsObjectPage',
		'certificationsui/test/integration/pages/UnitsObjectPage'
    ],
    function(JourneyRunner, opaJourney, CertificationsList, CertificationsObjectPage, UnitsObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('certificationsui') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheCertificationsList: CertificationsList,
					onTheCertificationsObjectPage: CertificationsObjectPage,
					onTheUnitsObjectPage: UnitsObjectPage
                }
            },
            opaJourney.run
        );
    }
);