import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { GetStaticProps } from 'next'
import { InferGetStaticPropsType } from 'next'
import styled from 'styled-components';
import {authorize, getImageUrls} from '@/helpers/google-drive';
import { AppStyleLayout } from '@/components/AppStyleLayout'

// style={{backgroundImage: `url(https://drive.google.com/uc?export=view&id=${imageIds[0]})`, backgroundSize: '100%'}}

const inter = Inter({ subsets: ['latin'] })

export default function Home({imageIds}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>Khuram.co</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main style={{height: "100vh"}}>
<AppStyleLayout />

      {/* <video src={"/logo.mp4"} autoPlay loop style={{ width: '500px', height: '500px' }} /> */}
  
      </main>
  
    </>
  )
}


export const getStaticProps: GetStaticProps = async (context) => {
  const imageIds = await authorize().then(async authClient => await getImageUrls(authClient)).catch(console.error);
  return {
    props: {imageIds},
  }
}