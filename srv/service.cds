using {com.sap as my} from '../db/schema';

@path: '/service/certification'
service CertificationService {

    annotate CertificationService.Certifications with @(Capabilities.Deletable: false);
    entity Certifications as projection on my.Certifications;

    entity Units          as projection on my.Units
        actions {
            action generateQuestions(ID : UUID);
            action uploadPDF(ID : UUID, content : LargeBinary @Core.MediaType:'application/pdf' );
        };
}
