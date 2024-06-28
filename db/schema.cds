namespace com.sap;

using {cuid} from '@sap/cds/common';

entity Certifications : cuid {
    code    : String;
    version : String;
    name    : String;
    units   : Composition of many Units
                  on units.certification = $self;
}

entity Units : cuid {
    code          : String;
    name          : String;
    content       : LargeBinary @Core.MediaType: 'application/pdf';
    text          : LargeString;
    certification : Association to Certifications;
}
