import React, { useRef, useState } from "react";
import { FormikValues, useFormik } from "formik";
import * as Yup from "yup";
import classes from "../../utility/form_styles.module.scss";
import { Button, CircularProgress, Grid, Hidden } from "@material-ui/core";
import { generalFileForm } from "../../utility/general";
import { GetAppRounded, PlayArrow } from "@material-ui/icons";
import { RouteComponentProps } from "react-router-dom";
import {
  handleFileUploadChangedCommon,
  submitToServer,
} from "../../utility/form_common";
import {
  LoadTestData,
  CommonTextElement,
  CommonFileElement,
  SelectFieldsElement,
} from "../../utility/form_common_fields";
import { useTypedSelector } from "../../../hooks/useTypedSelector";

type Props = {};

type UserFormData = {
  filename: string;
  job_name: string;
  email?: string;
  useTest: boolean;
  marker_name: string;
  p_value: string;
  beta?: string | undefined;
  slope_se?: string | undefined;
  GTEX8tissue: string;
  p_one: string;
  p_two: string;
  p_twelve: string;
  type: string;
  s_prop: string;
  [key: string]: any;
};

const EqtlColocForm: React.FC<Props & RouteComponentProps> = (props) => {
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
    p_value: "",
    beta: "",
    slope_se: "",
    GTEX8tissue: "",
    p_one: "",
    p_two: "",
    p_twelve: "",
    type: "",
    s_prop: "",
  };

  const testValues = {
    filename: "test.txt",
    job_name: "Test Coloc",
    ...(!user?.username && { email: "" }),
    useTest: true,
    marker_name: "1",
    p_value: "3",
    beta: "4",
    slope_se: "5",
    GTEX8tissue: "Adipose_Subcutaneous",
    p_one: "0.0001",
    p_two: "0.0001",
    p_twelve: "0.00001",
    type: "cc",
    s_prop: "0.33",
  };

  const formik = useFormik<UserFormData>({
    initialValues: formValues || initialValues,
    enableReinitialize: true,

    validationSchema: Yup.object({
      filename: Yup.string().required("Please upload a file"),
      job_name: Yup.string().required("Job name is required"),
      ...(!user?.username && {
        email: Yup.string().email().required("Email field is required"),
      }),
      marker_name: Yup.number()
        .required("Marker name column number is required")
        .min(1, "The minimum is one")
        .max(15, "the max is fifteen"),
      p_value: Yup.number()
        .required("P-Value column number is required")
        .min(1, "The minimum is one")
        .max(15, "the max is fifteen"),
      beta: Yup.number()
        .min(1, "The minimum is one")
        .max(15, "the max is fifteen"),
      slope_se: Yup.number()
        .min(1, "The minimum is one")
        .max(15, "the max is fifteen"),
      GTEX8tissue: Yup.string().required("Please select a tissue"),
      p_one: Yup.number().required(
        "This value is required and must be a number value"
      ),
      p_two: Yup.number().required(
        "This value is required and must be a number value"
      ),
      p_twelve: Yup.number().required(
        "This value is required and must be a number value"
      ),
      type: Yup.string().required("Please select a value"),
      s_prop: Yup.number().required(
        "This value is required and must be a number value"
      ),
    }),

    onSubmit: (values: FormikValues) => {
      const results: Partial<{
        filename: string;
        job_name: string;
        email?: string;
        useTest: boolean;
        marker_name: string;
        p_value: string;
        beta?: string | undefined;
        slope_se?: string | undefined;
        GTEX8tissue: string;
        p_one: string;
        p_two: string;
        p_twelve: string;
        type: string;
        s_prop: string;
      }> = {};

      results.filename = values.filename;
      results.job_name = values.job_name;
      results.useTest = values.useTest;
      results.marker_name = values.marker_name;
      results.p_value = values.p_value;
      results.GTEX8tissue = values.GTEX8tissue;
      results.p_one = values.p_one;
      results.p_two = values.p_two;
      results.p_twelve = values.p_twelve;
      results.type = values.type;
      results.s_prop = values.s_prop;

      if (values.beta) {
        results.beta = values.beta;
      }

      if (values.slope_se) {
        results.slope_se = values.slope_se;
      }

      if (user?.username) {
        submitToServer(
          results,
          uploadFile,
          setLoading,
          "eqtlcoloc",
          "eqtlcoloc",
          user.username,
          props
        );
      } else {
        results.email = values.email;
        submitToServer(
          results,
          uploadFile,
          setLoading,
          "eqtlcoloc/noauth",
          "eqtlcoloc",
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

  const analysisType = [
    { variable: "quant", name: "QUANTIFICATION" },
    { variable: "cc", name: "CASE-CONTROL" },
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
      variable: "Cells_Cultured_fibroblasts",
      name: "Cells_Cultured_fibroblasts",
    },
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
    { variable: "Kidney_Cortex", name: "Kidney_Cortex" },
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
              "https://drive.google.com/file/d/1-S8gFs5y-f67LPUT8NJaMzi9waAUc7yI/view?usp=sharing"
            }
            target="_blank"
          >
            Download Test File
          </Button>
          <div className={classes.header_div}>
            <h2>Enter a Job Name</h2>
          </div>
          <CommonTextElement
            classes={classes}
            formik={formik}
            label={"Job Name"}
            textVariable={"job_name"}
            tooltip={"Enter a name for your job"}
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
              title: "p_value",
              text:
                "the column number of the pvalue in the summary statistic file. It can be p, pvalue, pval_nominal etc.",
            },
          ])}
          <div className={classes.header_div}>
            <h2>Summary statistics optional column positions</h2>
          </div>
          {generalFileForm(classes, formik, [
            {
              title: "beta",
              text:
                "the column number of the beta in the summary statistic file. It can be beta, slope etc.",
            },
            {
              title: "slope_se",
              text:
                "the column number of the standard error in the summary statistic file. It can be se, standard_error etc.",
            },
          ])}
          <div className={classes.header_div}>
            <h2>Tool Parameters</h2>
          </div>
          <SelectFieldsElement
            classes={classes}
            formik={formik}
            selectElement={tissues}
            selectVariable={"GTEX8tissue"}
            selectName={"GTex Tissues"}
          />

          <CommonTextElement
            classes={classes}
            formik={formik}
            label={"P One"}
            textVariable={"p_one"}
            tooltip={
              "this parameter specifies the prior probability a SNP is associated with trait 1, i.e, the GWAS summary"
            }
          />

          <CommonTextElement
            classes={classes}
            formik={formik}
            label={"P Two"}
            textVariable={"p_two"}
            tooltip={
              "this parameter specifies the prior probability a SNP is associated with trait 2, i.e, the eqtl tissue."
            }
          />

          <CommonTextElement
            classes={classes}
            formik={formik}
            label={"P Twelve"}
            textVariable={"p_twelve"}
            tooltip={
              "this parameter specifies the prior probability a SNP is associated with both traits, i.e, the GWAS summary and the eqtl tissue."
            }
          />

          <SelectFieldsElement
            classes={classes}
            formik={formik}
            selectElement={analysisType}
            selectVariable={"type"}
            selectName={"Analysis Type"}
          />

          <CommonTextElement
            classes={classes}
            formik={formik}
            label={"S property"}
            textVariable={"s_prop"}
            tooltip={
              "this parameter is required for a case-control GWAS summary dataset and it indicates the proportion of samples in the GWAS summary that are cases."
            }
          />
        </Grid>
        <div className={classes.button_container}>
          {loading ? (
            <CircularProgress color="secondary" className="progress" />
          ) : (
            <Button
              className={classes.form_button}
              startIcon={<PlayArrow />}
              size="large"
              type={"submit"}
              variant="contained"
              color="primary"
            >
              Execute <Hidden xsDown> Analysis</Hidden>
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default EqtlColocForm;
