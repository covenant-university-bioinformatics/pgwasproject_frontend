import React from "react";
import classes from "./index.module.scss";
import { ReactComponent as RegisterImage } from "../../resources/images/register.svg";
import { ReactComponent as RunningAnalysisImage } from "../../resources/images/running_analysis.svg";
import { ReactComponent as ErrorImage } from "../../resources/images/errors.svg";

type Props = {};

const Tutorials: React.FC<Props> = (props: Props) => {
  return (
    <div className={classes.Tutorial}>
      {/*<div className={classes.container}>*/}
      <div className={classes.header}>
        <div className={classes.container}>
          <h1>Tutorial on running an analysis on SysBiol PGWAS </h1>
          <div className={classes.files}>
            <h3>Download Test File</h3>
            {/*<p>*/}
            {/*  <a*/}
            {/*    rel="noreferrer"*/}
            {/*    target="_blank"*/}
            {/*    href="https://drive.google.com/file/d/193L8JZ-yEbZUmE2iSckUZSkIqpS4KPXh/view?usp=sharing"*/}
            {/*  >*/}
            {/*    Small file*/}
            {/*  </a>{" "}*/}
            {/*  - This is a small data test in genomic build version hg 19 to test*/}
            {/*  the Annotation and Deleteriousness tools.*/}
            {/*</p>*/}
            <p>
              <a
                rel="noreferrer"
                target="_blank"
                href="https://drive.google.com/file/d/1xc-ezHEXYD-Vrow5M5YW9c-60Zu9fY7X/view?usp=sharing"
              >
                Celiac disease
              </a>{" "}
              - This data includes SNPs significantly associated with Celiac
              disease downloaded from GWAS Catalog. The SNPs in this file are in
              genomic assembly hg38. Convert it to Genomic assembly hg19 with
              Liftover tool and use the resulting output in the other tools.
            </p>
            {/*<p>*/}
            {/*  <a*/}
            {/*    rel="noreferrer"*/}
            {/*    target="_blank"*/}
            {/*    href="https://drive.google.com/file/d/1-Nz-yrhG5ThdoMDsPbu6HsUztxEVOe4p/view?usp=sharing"*/}
            {/*  >*/}
            {/*    Gene based test(small)*/}
            {/*  </a>{" "}*/}
            {/*  - This is a small file in genomic build version hg 19 to test the*/}
            {/*  Gene based tools (Magma).*/}
            {/*</p>*/}
            {/*<p>*/}
            {/*  <a*/}
            {/*    rel="noreferrer"*/}
            {/*    target="_blank"*/}
            {/*    href="https://drive.google.com/file/d/109RByxkR1o8uJGNslrL60oCP5RGSZWVt/view?usp=sharing"*/}
            {/*  >*/}
            {/*    Gene based test (Big)*/}
            {/*  </a>{" "}*/}
            {/*  - This is a big file in genomic build version hg 19 to test the*/}
            {/*  Gene based tools (Magma).*/}
            {/*</p>*/}
            {/*<p>*/}
            {/*  <a*/}
            {/*    rel="noreferrer"*/}
            {/*    target="_blank"*/}
            {/*    href="https://drive.google.com/file/d/15dlfyCcn5fAuLjkWbE1E4fSdRMkhHmz3/view?usp=sharing"*/}
            {/*  >*/}
            {/*    Pathway based test (Small)*/}
            {/*  </a>{" "}*/}
            {/*  - This is a small file in genomic build version hg 19 to test the*/}
            {/*  Pathway based analysis. The file is for chromosome one.*/}
            {/*</p>*/}
            {/*<p>*/}
            {/*  <a*/}
            {/*    rel="noreferrer"*/}
            {/*    target="_blank"*/}
            {/*    href="https://drive.google.com/file/d/1JHhxVFmHNURD9O6I7RCX71NkbbfInhpF/view?usp=sharing"*/}
            {/*  >*/}
            {/*    Pathway based test (Big)*/}
            {/*  </a>{" "}*/}
            {/*  - This is a big file in genomic build version hg 19 to test the*/}
            {/*  Pathway based analysis.*/}
            {/*</p>*/}
          </div>
        </div>
      </div>
      <div className={classes.register}>
        <h2 className={classes.heading}>
          Instructions on how to register on the application
        </h2>
        <div className={classes.container}>
          <div className={classes.image}>
            <RegisterImage className={classes.SVGIcon} />
          </div>
          <ul>
            <li>
              Sign UP/Sign IN is not required, but it helps us to keep an
              history of your new jobs and also send emails about the status of
              your jobs. Please Sign up
            </li>
            <li>
              Visit the home page site: https://www.spgwas.waslitbre.org/ (Side
              note: In case you have viewed this site before, you might be
              viewing an old version of the site because of the way browsers
              cache sites. Please you might need to press SHIFT + ENTER while in
              focus of the browser address bar to fetch a fresh version from the
              server)
            </li>
            <li>Click on the Sign UP button on the top right corner.</li>
            <li>Enter your details and submit</li>
            <li>
              An email will be sent to the register email address, please first
              verify the email before continuing as you won't be able to run any
              analysis without verifying your email. If you don't see the email,
              also check your spam box.
            </li>
            <li>After email verification, please Login.</li>
          </ul>
        </div>
      </div>
      <div className={classes.analysis}>
        <h2 className={classes.heading}>Running an analysis</h2>
        <div className={classes.container}>
          <div className={classes.image}>
            <RunningAnalysisImage className={classes.SVGIcon} />
          </div>
          <ul>
            <li>
              Please note that all analysis are executed with databases in
              genomic build hg19/GRcH37. Ensure your files are in the build
              version before continuing. You can also use the Liftover tool to
              convert your files.
            </li>
            <li>
              To run a tool, either click on the Tools navigation button on the
              header pane, or the yellow 'Run tool' button on the banner or
              'click to start' link on the Execute Individual tools section.
            </li>
            <li>Select the tool you would like to execute.</li>
            <li>
              On the selected tool dashboard, click on new analysis button on
              the tab panel.
            </li>
            <li>Fill in the job name.</li>
            <li>If you are not logged in, fill in your email</li>
            <li>
              Upload the files you want to use for the analysis (important! -
              please ensure your filename doesn't have illegal characters like
              spaces, braces etc!). Please use only text files. Please note that the file upload limit is 300mb.
            </li>
            <li>
              In the next section, fill in the correct column number for the
              uploaded file. The column names in the uploaded file, should be
              the column numbers filled in the text boxes (This is very
              important because if incorrect numbers are selected, the analysis
              will be incorrect) The column numbers should start from one.
            </li>
            <li>Enter or select other appropriate parameters.</li>
            <li>Submit a job by clicking on 'Execute Analysis'</li>
          </ul>
        </div>
      </div>

      <div className={classes.results}>
        <h2 className={classes.heading}>Viewing the results</h2>
        <div className={classes.result_list}>
          <div className={classes.liftover}>
            <h3>Liftover</h3>
            <ul>
              <li>
                After clicking on the Execute Analysis button, you will be
                navigated to a result list if you are logged in and a result
                view if you are not logged in. That page will automatically
                reload until the job is complete.
              </li>
              <li>Use the download buttons to obtain your result files.</li>
              <li>
                Please note: The Liftover service can only run 1 concurrent job.
                This might not be noticed as Liftover completes its job in a
                matter of seconds.
              </li>
            </ul>
          </div>
          <div className={classes.annotation}>
            <h3>Annotation</h3>
            <ul>
              <li>
                After clicking on the Execute Analysis button, you will be
                navigated to a result list. Click on the 'view' button to go to
                the results page. If you are not logged in, you will be
                navigated directly to the result view. Please keep the link to
                this page. If you want us to save the jobs, please sign in.
              </li>
              <li>
                You will see the status of the job, and some tables with
                information about your jobs. (This page will also automatically
                reload if the job is not done, if it is a long job, an email
                will be sent when it is done)
              </li>
              <li>
                When the job is completed, scroll down to view the results. Use
                the download buttons to obtain results of your analysis.
              </li>
              <li>
                Please note: The annotation service can only run 1 concurrent
                jobs per time due to limited cpu resources, these can cause
                other people's jobs to be queued for long if someone is running
                an analysis on a big file.
              </li>
            </ul>
          </div>
          <div className={classes.delet}>
            <h3>Gene Deleteriousness</h3>
            <ul>
              <li>
                After clicking on the Execute Analysis button, you will be
                navigated to a result list. Click on the 'view' button to go to
                the results page. If you are not logged in, you will be
                navigated directly to the result view. Please keep the link to
                this page. If you want us to save the jobs, please sign in.
              </li>
              <li>
                You will see the status of the job, and some tables with
                information about your jobs. (This page will also automatically
                reload if the job is not done, if it is a long job, an email
                will be sent when it is done)
              </li>
              <li>
                When the job is completed, scroll down to view the results. Use
                the download buttons to obtain results of your analysis.
              </li>
              <li>
                Please note: the deleteriousnes service can only run 1
                concurrent jobs per time due to limited cpu resources, these can
                cause other people's jobs to be queued for long if someone is
                running an analysis on a big file.
              </li>
            </ul>
          </div>
          <div className={classes.gbased}>
            <h3>Gene Based Analysis</h3>
            <ul>
              <li>
                After clicking on the Execute Analysis button, you will be
                navigated to a result list. Click on the 'view' button to go to
                the results page. If you are not logged in, you will be
                navigated directly to the result view. Please keep the link to
                this page. If you want us to save the jobs, please sign in.
              </li>
              <li>
                You will see the status of the job, and some tables with
                information about your jobs. (This page will also automatically
                reload if the job is not done, if it is a long job, an email
                will be sent when it is done)
              </li>
              <li>
                When the job is completed, scroll down to view the results. Use
                the download buttons to obtain results of your analysis.
              </li>
              <li>
                Please note: The gene-based service can only run 1 concurrent
                jobs per time due to limited cpu resources, these can cause
                other people's jobs to be queued for long if someone is running
                an analysis on a big file.
              </li>
            </ul>
          </div>
          <div className={classes.pbased}>
            <h3>Pathway Based Analysis</h3>
            <ul>
              <li>
                After clicking on the Execute Analysis button, you will be
                navigated to a result list. Click on the 'view' button to go to
                the results page. If you are not logged in, you will be
                navigated directly to the result view. Please keep the link to
                this page. If you want us to save the jobs, please sign in.
              </li>
              <li>
                You will see the status of the job, and some tables with
                information about your jobs. (This page will also automatically
                reload if the job is not done, if it is a long job, an email
                will be sent when it is done)
              </li>
              <li>
                When the job is completed, scroll down to view the results. Use
                the download buttons to obtain results of your analysis.
              </li>
              <li>
                Please note: The pathway based service can only run 1 concurrent
                jobs per time due to limited cpu resources, these can cause
                other people's jobs to be queued for long if someone is running
                an analysis on a big file.
              </li>
            </ul>
          </div>
          <div className={classes.eqtl}>
            <h3>EQTL Analysis</h3>
            <ul>
              <li>
                After clicking on the Execute Analysis button, you will be
                navigated to a result list. Click on the 'view' button to go to
                the results page. If you are not logged in, you will be
                navigated directly to the result view. Please keep the link to
                this page. If you want us to save your jobs, please sign in.
              </li>
              <li>
                After clicking on the view link, you will see the status of the
                job, and some tables with information about your jobs. (This
                page will also automatically reload if the job is not done, if
                it is a long job, an email will be sent when it is done)
              </li>
              <li>
                When the job is completed, scroll down to view the results. Use
                the download buttons to obtain results of your analysis.
              </li>
              <li>
                Please note: The EQTL service can only run 1 concurrent jobs per
                time due to limited cpu resources, these can cause other
                people's jobs to be queued for long if someone is running an
                analysis on a big file.
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className={classes.errors}>
        <h2 className={classes.heading}>Errors, Issues, Complaints</h2>
        <div className={classes.container}>
          <div className={classes.image}>
            <ErrorImage className={classes.SVGIcon} />
          </div>
          <ul>
            <li>
              If the Job fails, you will see some error information from the
              tool about what happened. Please send a snapshot to the email
              below on the errors. (Apologies, you might get a long text of
              errors information for now. We do this because the application is
              still in development and testing stage and full error information
              will be useful in debugging the application. This will be changed
              to a shorter message later).
            </li>
            <li>
              If you come across any others errors, bugs, or you have some
              complaints, please kindly document it, (text and snapshots) and
              email it to the email below. Also there is room for improvement in
              the application, please kindly send your comments to the email
              below.
            </li>
            <li>
              Email: dare.falola@covenantuniversity.edu.ng,
              yagoub.adam@covenantuniversity.edu.ng
            </li>
          </ul>
        </div>
      </div>
      {/*</div>*/}
    </div>
  );
};

export default Tutorials;
