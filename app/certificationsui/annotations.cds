using CertificationService as service from '../../srv/service';

annotate service.Certifications with @(UI.LineItem: [
    {
        $Type: 'UI.DataField',
        Label: 'Certification Code',
        Value: code,
    },
    {
        $Type: 'UI.DataField',
        Label: 'Certification Name',
        Value: name,
    },
]);

annotate service.Certifications with @(
    UI.FieldGroup #GeneratedGroup1: {
        $Type: 'UI.FieldGroupType',
        Data : [
            {
                $Type: 'UI.DataField',
                Label: 'Certification Code',
                Value: code,
            },
            {
                $Type: 'UI.DataField',
                Label: 'Certification Name',
                Value: name,
            },
        ],
    },
    UI.Facets                     : [
        {
            $Type : 'UI.ReferenceFacet',
            ID    : 'GeneratedFacet1',
            Label : 'Certification Information',
            Target: '@UI.FieldGroup#GeneratedGroup1',
        },
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Learning Journey Units',
            ID    : 'LearningJourneyUnits',
            Target: 'units/@UI.LineItem#LearningJourneyUnits',

        },
    ]
);

annotate service.Units with @(UI.LineItem #LearningJourneyUnits: [
    {
        $Type: 'UI.DataField',
        Value: code,
        Label: 'Unit',
    },
    {
        $Type: 'UI.DataField',
        Value: name,
        Label: 'Unit Name',
    },
    {
        $Type : 'UI.DataFieldForAction',
        Action: 'CertificationService.generateQuestions',
        Label : 'Generate Questions',
        Inline: true
    },
    {
        $Type : 'UI.DataFieldForAction',
        Action: 'CertificationService.uploadPDF',
        Label : 'Upload PDF',
        Inline: true
    }
]);
