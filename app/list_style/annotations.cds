using CatalogService as service from '../../srv/interaction_srv';

annotate service.CHAR_NUMVAL1 with @(
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Label : 'CHAR_NUM',
            Value : CHAR_NUM,
        },
        {
            $Type : 'UI.DataField',
            Label : 'CHAR_NUMVAL',
            Value : CHAR_NUMVAL,
        },
        {
            $Type : 'UI.DataField',
            Label : 'CHARVAL_NUM',
            Value : CHARVAL_NUM,
        },
        {
            $Type : 'UI.DataField',
            Label : 'CHAR_NUMVALDESC',
            Value : CHAR_NUMVALDESC,
        },
    ]
);
annotate service.CHAR_NUMVAL1 with @(
    UI.FieldGroup #GeneratedGroup1 : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : 'CHAR_NUM',
                Value : CHAR_NUM,
            },
            {
                $Type : 'UI.DataField',
                Label : 'CHAR_NUMVAL',
                Value : CHAR_NUMVAL,
            },
            {
                $Type : 'UI.DataField',
                Label : 'CHARVAL_NUM',
                Value : CHARVAL_NUM,
            },
            {
                $Type : 'UI.DataField',
                Label : 'CHAR_NUMVALDESC',
                Value : CHAR_NUMVALDESC,
            },
        ],
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'GeneratedFacet1',
            Label : 'General Information',
            Target : '@UI.FieldGroup#GeneratedGroup1',
        },
    ]
);
