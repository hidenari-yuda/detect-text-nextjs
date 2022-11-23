import { Snackbar } from 'Components/Atomic'
import { FileUploadProgress } from 'Components/Atomic/FileUploadProgress'
import { Loading } from 'Components/Atomic/Loading'
import Layout from 'Components/Templates/Layout/Layout'
import { Renderer } from 'Components/Utils/Renderer'
import { AppProps } from 'next/app'
import Head from 'next/head'
import React from 'react'
import { RecoilRoot } from 'recoil'
import { GlobalStyles } from 'styles'
import {
  FileUploadProgressContext,
  useFileUploadProgressContext,
} from 'Utils/FileUploadProgressContext'
import { LoadingContext, useLoadingContext } from 'Utils/LoadingContext'
import { SnackbarContext, useSnackbarContext } from 'Utils/SnackbarContext'

export const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>umerun</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
      </Head>
      <RecoilRoot>
        <LoadingContext.Provider value={useLoadingContext()}>
          <FileUploadProgressContext.Provider
            value={useFileUploadProgressContext()}
          >
            <SnackbarContext.Provider value={useSnackbarContext()}>
              <Renderer>
                <Layout>
                  <GlobalStyles />
                  <Component {...pageProps} />
                </Layout>
                <Snackbar />
                <FileUploadProgress />
                <Loading />
              </Renderer>
            </SnackbarContext.Provider>
          </FileUploadProgressContext.Provider>
        </LoadingContext.Provider>
      </RecoilRoot>
    </>
  )
}

export default App


// for line liff app
// function MyApp({ Component, pageProps }: AppProps) {
//   const [liffObject, setLiffObject] = useState(null);
//   const [liffError, setLiffError] = useState(null);

//   // Execute liff.init() when the app is initialized
//   useEffect(() => {
//     // to avoid `window is not defined` error
//     import("@line/liff").then((liff) => {
//       console.log("start liff.init()...");
//       liff
//         .init({ liffId: process.env.LIFF_ID })
//         .then(() => {
//           console.log("liff.init() done");
//           setLiffObject(liff);
//         })
//         .catch((error: { toString: () => SetStateAction<null>; }) => {
//           console.log(`liff.init() failed: ${error}`);
//           if (!process.env.liffId) {
//             console.info(
//               "LIFF Starter: Please make sure that you provided `LIFF_ID` as an environmental variable."
//             );
//           }
//           setLiffError(error.toString());
//         });
//     });
//   }, []);

//   // Provide `liff` object and `liffError` object
//   // to page component as property
//   pageProps.liff = liffObject;
//   pageProps.liffError = liffError;

// return (
//   <RecoilRoot>
//     <LoadingContext.Provider value={useLoadingContext()}>
//       <SnackbarContext.Provider value={useSnackbarContext()}>
//         <Renderer>
//           <Layout>
//             <GlobalStyles />
//             <Component {...pageProps} />
//           </Layout>
//           <Snackbar />
//           <Loading />
//         </Renderer>
//       </SnackbarContext.Provider>
//     </LoadingContext.Provider>
//   </RecoilRoot>);
// }

// export default MyApp;
