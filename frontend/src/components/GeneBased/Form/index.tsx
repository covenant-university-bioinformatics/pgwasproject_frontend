import React, { useRef, useState } from "react";
import { FormikValues, useFormik } from "formik";
import * as Yup from "yup";
// import classes from "./index.module.scss";
import classes from "../../utility/form_styles.module.scss";
import { Button, CircularProgress, Grid, Hidden } from "@material-ui/core";
import { generalFileForm } from "../../utility/general";
import { GetAppRounded, PlayArrow } from "@material-ui/icons";
import { RouteComponentProps } from "react-router-dom";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import {
  handleFileUploadChangedCommon,
  submitToServer,
} from "../../utility/form_common";
import {
  CommonFileElement,
  CommonTextElement,
  LoadTestData,
  SelectFieldsElement,
} from "../../utility/form_common_fields";

type Props = {};

type UserFormData = {
  filename: string;
  job_name: string;
  email?: string;
  useTest: boolean;
  marker_name: string | undefined;
  chromosome: string | undefined;
  position: string | undefined;
  p_value: string | undefined;
  sample_size: string | undefined;
  population: string;
  synonym: string;
  up_window: string;
  down_window: string;
  tissue: string;
  [key: string]: any;
};

const GeneBasedForm: React.FC<Props & RouteComponentProps> = (props) => {
  const { user } = useTypedSelector((state) => state.auth);
  const [uploadFile, setUploadFile] = useState<any>(null);
  const [useTest, setUseTest] = useState<boolean>(false);
  const [formValues, setFormValues] = useState<UserFormData>();
  const fileInput = useRef<any>(null);
  const [loading, setLoading] = useState(false);

  const initialValues = {
    filename: "",
    job_name: "",
    ...(!user?.username && { email: "" }),
    useTest: false,
    marker_name: "",
    chromosome: "",
    position: "",
    p_value: "",
    sample_size: "",
    population: "",
    synonym: "",
    up_window: "0",
    down_window: "0",
    tissue: "",
  };

  const testValues = {
    filename: "test.txt",
    job_name: "Test Gbased",
    ...(!user?.username && { email: "" }),
    useTest: true,
    marker_name: "1",
    chromosome: "2",
    position: "3",
    p_value: "4",
    sample_size: "5",
    population: "eur",
    synonym: "No",
    up_window: "0",
    down_window: "0",
    tissue: "Adrenal_Gland",
  };

  const formik = useFormik<UserFormData>({
    initialValues: formValues || initialValues,
    enableReinitialize: true,
    validationSchema: Yup.object({
      filename: Yup.string().required("Please upload a file"),
      marker_name: Yup.number()
        .required("Marker name column number is required")
        .min(1, "The minimum is one")
        .max(15, "the max is fifteen"),
      chromosome: Yup.number()
        .required("Chromosome column number is required")
        .min(1, "The minimum is one")
        .max(15, "the max is fifteen"),
      position: Yup.number()
        .required("Position column number is required")
        .min(1, "The minimum is one")
        .max(15, "the max is fifteen"),
      p_value: Yup.number()
        .required("Effect Allele column number is required")
        .min(1, "The minimum is one")
        .max(15, "the max is fifteen"),
      sample_size: Yup.number()
        .min(1, "The minimum is one")
        .max(15, "the max is fifteen"),
      job_name: Yup.string().required("Job name is required"),
      ...(!user?.username && {
        email: Yup.string().email().required("Email field is required"),
      }),
      population: Yup.string().required("Please select a closest population"),
      synonym: Yup.string().required(
        "Please select how to handle similar SNPs"
      ),
      up_window: Yup.number().required("Please enter in a number value"),
      down_window: Yup.number().required("Please enter in a number value"),
      tissue: Yup.string().required("Please select a tissue"),
    }),

    onSubmit: (values: FormikValues) => {
      if (user?.username) {
        submitToServer(
          values,
          uploadFile,
          setLoading,
          "genebased",
          "genebased",
          user.username,
          props
        );
      } else {
        submitToServer(
          values,
          uploadFile,
          setLoading,
          "genebased/noauth",
          "genebased",
          undefined,
          props
        );
      }
    },
  });

  const handleUseTest = (event: any) => {
    formik.resetForm();
    setUseTest(true);
    setFormValues(testValues);
    fileInput.current.querySelector("input").disabled = true;
  };

  const handleRemoveUseTest = (event: any) => {
    setUseTest(false);
    setFormValues(undefined);
    formik.setFieldValue("filename", "");
    fileInput.current.querySelector("input").value = "";
    fileInput.current.querySelector("input").disabled = false;
    formik.resetForm();
  };

  const handleFileUploadChange = (event: any) => {
    handleFileUploadChangedCommon(event, formik, setUploadFile);
  };

  const handleFileBlur = (event: any) => {
    if (event.target.files) {
      formik.setFieldError("filename", "Please upload a file");
      formik.setFieldTouched("filename");
    }
  };

  const handleRemove = (event: any) => {
    setUploadFile(null);
    formik.setFieldValue("filename", "");
    formik.setFieldError("filename", "Please upload a file");
    fileInput.current.querySelector("input").value = "";
  };

  const populations = [
    { variable: "afr", name: "AFR" },
    { variable: "eur", name: "EUR" },
    { variable: "amr", name: "AMR" },
    { variable: "eas", name: "EAS" },
    { variable: "sas", name: "SAS" },
  ];

  const synonyms = [
    { variable: "No", name: "NO" },
    { variable: "drop", name: "DROP" },
    { variable: "drop-dup", name: "DROP_DUP" },
    { variable: "skip", name: "SKIP" },
    { variable: "skip_dup", name: "SKIP_DUP" },
  ];

  const tissues = [
    { variable: "Adipose_Subcutaneous", name: "Adipose_Subcutaneous" },
    { variable: "Adipose_Visceral_Omentum", name: "Adipose_Visceral_Omentum" },
    { variable: "Adrenal_Gland", name: "Adrenal_Gland" },
    { variable: "Artery_Aorta", name: "Artery_Aorta" },
    { variable: "Artery_Coronary", name: "Artery_Coronary" },
    { variable: "Artery_Tibial", name: "Artery_Tibial" },
    { variable: "Brain_Amygdala", name: "Brain_Amygdala" },
    {
      variable: "Brain_Anterior_cingulate_cortex_BA24",
      name: "Brain_Anterior_cingulate_cortex_BA24",
    },
    {
      variable: "Brain_Caudate_basal_ganglia",
      name: "Brain_Caudate_basal_ganglia",
    },
    {
      variable: "Brain_Cerebellar_Hemisphere",
      name: "Brain_Cerebellar_Hemisphere",
    },
    { variable: "Brain_Cerebellum", name: "Brain_Cerebellum" },
    { variable: "Brain_Cortex", name: "Brain_Cortex" },
    { variable: "Brain_Frontal_Cortex_BA9", name: "Brain_Frontal_Cortex_BA9" },
    { variable: "Brain_Hippocampus", name: "Brain_Hippocampus" },
    { variable: "Brain_Hypothalamus", name: "Brain_Hypothalamus" },
    {
      variable: "Brain_Nucleus_accumbens_basal_ganglia",
      name: "Brain_Nucleus_accumbens_basal_ganglia",
    },
    {
      variable: "Brain_Putamen_basal_ganglia",
      name: "Brain_Putamen_basal_ganglia",
    },
    {
      variable: "Brain_Spinal_cord_cervical_c_1",
      name: "Brain_Spinal_cord_cervical_c-1",
    },
    { variable: "Brain_Substantia_nigra", name: "Brain_Substantia_nigra" },
    { variable: "Breast_Mammary_Tissue", name: "Breast_Mammary_Tissue" },
    {
      variable: "Cells_EBV_transformed_lymphocytes",
      name: "Cells_EBV-transformed_lymphocytes",
    },
    { variable: "Colon_Sigmoid", name: "Colon_Sigmoid" },
    { variable: "Colon_Transverse", name: "Colon_Transverse" },
    {
      variable: "Esophagus_Gastroesophageal_Junction",
      name: "Esophagus_Gastroesophageal_Junction",
    },
    { variable: "Esophagus_Mucosa", name: "Esophagus_Mucosa" },
    { variable: "Esophagus_Muscularis", name: "Esophagus_Muscularis" },
    { variable: "Heart_Atrial_Appendage", name: "Heart_Atrial_Appendage" },
    { variable: "Heart_Left_Ventricle", name: "Heart_Left_Ventricle" },
    { variable: "Liver", name: "Liver" },
    { variable: "Lung", name: "Lung" },
    { variable: "Minor_Salivary_Gland", name: "Minor_Salivary_Gland" },
    { variable: "Muscle_Skeletal", name: "Muscle_Skeletal" },
    { variable: "Nerve_Tibial", name: "Nerve_Tibial" },
    { variable: "Ovary", name: "Ovary" },
    { variable: "Pancreas", name: "Pancreas" },
    { variable: "Pituitary", name: "Pituitary" },
    { variable: "Prostate", name: "Prostate" },
    {
      variable: "Skin_Not_Sun_Exposed_Suprapubic",
      name: "Skin_Not_Sun_Exposed_Suprapubic",
    },
    {
      variable: "Skin_Sun_Exposed_Lower_leg",
      name: "Skin_Sun_Exposed_Lower_leg",
    },
    {
      variable: "Small_Intestine_Terminal_Ileum",
      name: "Small_Intestine_Terminal_Ileum",
    },
    { variable: "Spleen", name: "Spleen" },
    { variable: "Stomach", name: "Stomach" },
    { variable: "Testis", name: "Testis" },
    { variable: "Thyroid", name: "Thyroid" },
    { variable: "Uterus", name: "Uterus" },
    { variable: "Vagina", name: "Vagina" },
    { variable: "Whole_Blood", name: "Whole_Blood" },
  ];

  return (
    <div className={classes.job_form}>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          <LoadTestData
            classes={classes}
            useTest={useTest}
            handleUseTest={handleUseTest}
            handleRemoveUseTest={handleRemoveUseTest}
          />
          <Button
            type={"button"}
            variant="contained"
            color="primary"
            size={"small"}
            className={classes.button}
            endIcon={<GetAppRounded />}
            href={
              "https://drive.google.com/file/d/109RByxkR1o8uJGNslrL60oCP5RGSZWVt/view?usp=sharing"
            }
            target="_blank"
          >
            Download Test File
          </Button>
          <div className={classes.header_div}>
            <h2>Enter Job Name</h2>
          </div>
          <CommonTextElement
            classes={classes}
            formik={formik}
            label={"Job Name"}
            textVariable={"job_name"}
            tooltip={"Enter the name of the job"}
          />
          {user?.username ? null : (
            <>
              <div className={classes.header_div}>
                <h2>Enter your email</h2>
              </div>
              <CommonTextElement
                classes={classes}
                formik={formik}
                label={"Email"}
                textVariable={"email"}
                tooltip={"Enter your email"}
              />
            </>
          )}
          <div className={classes.header_div}>
            <h2>Upload a file</h2>
          </div>
          <CommonFileElement
            classes={classes}
            formik={formik}
            fileInput={fileInput}
            handleFileUploadChange={handleFileUploadChange}
            handleFileBlur={handleFileBlur}
            handleRemove={handleRemove}
          />

          <div className={classes.header_div}>
            <h2>Summary statistics column positions</h2>
          </div>

          {generalFileForm(classes, formik, [
            {
              title: "marker_name",
              text:
                "the column number of the marker name in the summary statistic file. It can be marker_name, rsid, snpid etc",
            },
            {
              title: "chromosome",
              text:
                "the column number of the chromosome in the summary statistic file. It can be also be chr",
            },
            {
              title: "position",
              text:
                "the column number of the  base pair positions in the summary statistic file. It can be bp",
            },
            {
              title: "p_value",
              text:
                "the column number of the pvalue in the summary statistic file. It can be p, pvalue, pval_nominal etc.",
            },
            {
              title: "sample_size",
              text:
                "the column number of the sample size in the summary statistic file. It can be also be n.",
            },
          ])}

          <div className={classes.header_div}>
            <h2>Tool Parameters</h2>
          </div>

          <SelectFieldsElement
            classes={classes}
            formik={formik}
            selectElement={populations}
            selectVariable={"population"}
            selectName={"Populations"}
            tooltip={
              "The population from which the GWAS summary file has been generated. We supported the five super populations of 1000 genomes."
            }
          />

          <SelectFieldsElement
            classes={classes}
            formik={formik}
            selectElement={synonyms}
            selectVariable={"synonym"}
            selectName={"Synonyms"}
            tooltip={
              "The option that indicates how to deal with synonymous SNP IDs."
            }
          />

          <SelectFieldsElement
            classes={classes}
            formik={formik}
            selectElement={tissues}
            selectVariable={"tissue"}
            selectName={"Tissue"}
            tooltip={
              "The tissue to calculate tissue-specific gene set analysis"
            }
          />

          <CommonTextElement
            classes={classes}
            formik={formik}
            label={"Up Window Size(KB)"}
            textVariable={"up_window"}
            tooltip={
              "A value upstream annotation window around genes in kb. The default value is 0"
            }
          />

          <CommonTextElement
            classes={classes}
            formik={formik}
            label={"Down Window Size(KB)"}
            textVariable={"down_window"}
            tooltip={
              "A value downstream annotation window around genes in kb. The default value is 0."
            }
          />
        </Grid>
        <div className={classes.button_container}>
          {loading ? (
              <div>
                <CircularProgress color="secondary" className="progress" />
                <div>Uploading...</div>
              </div>
          ) : (
            <Button
              className={classes.form_button}
              startIcon={<PlayArrow />}
              size="large"
              type={"submit"}
              variant="contained"
              color="primary"
              disabled={!formik.isValid}
            >
              Execute <Hidden xsDown> Analysis</Hidden>
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default GeneBasedForm;
