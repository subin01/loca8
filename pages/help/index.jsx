import { useState } from 'react'
import Head from 'next/head'

import Header from '../../components/Header'
import Footer from '../../components/Footer'

const FAQItem = ({ question, children }) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <article className="faq-item">
      <button className={`h2 ${isOpen ? 'icon-open' : 'icon-close'} `} onClick={() => setIsOpen(!isOpen)}>
        {question}
      </button>
      {isOpen && <div className="faq-answer">{children}</div>}
    </article>
  )
}

export default function Faq() {
  return (
    <>
      <Head>
        <title>Loca8 | Help - Frequently asked questions and other ways we can help</title>
      </Head>

      <Header></Header>

      <div>
        <main className="page-faq">
          <div className="intro">
            <h1>Need some help?</h1>
            <p>Browse through the most frequently asked questions below</p>
            <hr />
            <p>
              Or Contact us on
              <a href="https://wa.me/8589955968" className="cta-whatsapp" target="_blank">
                WhatsApp
              </a>
            </p>
          </div>
          <FAQItem question="How to register the tag ID purchased?">
            <p>You may follow the below steps to get your tag registered</p>
            <ul className="faq faq-steps">
              <li>
                <i>Step 1 </i> Scan the QR code which will automatically register your tag with its ID
              </li>
              <li>
                <i>Step 2 </i> You will see “Register or return your tag”, give your tag id and check if it is matching
              </li>
              <li>
                <i>Step 3 </i> Click on “verify”
              </li>
              <li>
                <i>Step 5 </i> Authenticate yourself or Click on the option “Sign in with Google”
              </li>
              <li>
                <i>Step 6 </i> Enter your details like Name & phone
              </li>
              <li>
                <i>Step 7 </i> Enter Activation key 8 digit number activation key inside our package
              </li>
              <li>
                <i>Step 8 </i> Save details
              </li>
            </ul>
          </FAQItem>

          <FAQItem question="How to view my registered tags?">
            <ul className="faq faq-steps">
              <li>
                <i>Step 1 </i> Click on the tab “Account”
              </li>
              <li>
                <i>Step 2 </i> Select the option “Sign in with Google”
              </li>
              <li>
                <i>Step 3 </i> you will see the tags you already registered
              </li>
            </ul>
          </FAQItem>
          <FAQItem question="I got a lost item with the Loca8 locket, how do I return it?">
            <ul className="faq faq-steps">
              <li>
                <i>Step 1 </i> Scan the QR code
              </li>
              <li>
                <i>Step 2 </i> You will see “Register or return your tag”, give your tag id and check if it is matching
              </li>
              <li>
                <i>Step 2 </i> Enter the Tag ID and click on “Verify”
              </li>
              <li>
                <i>Step 3 </i> When it prompts, furnish your details and type the message you want to communicate
              </li>
              <li>
                <i>Step 4 </i> Click on “notify owner”
              </li>
            </ul>
          </FAQItem>
          <FAQItem question="What if the QR code is unable to scan or doesn't scan?">
            <ul className="faq faq-steps">
              <li>
                <i>Step 1 </i> Click on the tab “Account”
              </li>
              <li>
                <i>Step 2 </i> Select the option “Sign in with Google”
              </li>
              <li>
                <i>Step 3 </i> “Click on Create Loca8 account” (first time when you log in only)
              </li>
              <li>
                <i>Step 4 </i> You are all set with your account with Loca8
              </li>
              <li>
                <i>Step 5 </i> Register your tag with the number on the locket purchased
              </li>
            </ul>
          </FAQItem>
          <FAQItem question="How do I get notified if someone receives my valuables with my locket?">
            <ul className="faq faq-steps">
              <li>
                <i>Step 1 </i> You will get an email as well as a text message
              </li>
              <li>
                <i>Step 2 </i> You may also check the spam and promotions section of your mailbox
              </li>
            </ul>
          </FAQItem>
          <FAQItem question="What all things can be secured and recovered with loca8?">
            <ul className="faq">
              <li>Luggage tags </li>
              <li>Pet’s collar </li>
              <li>Car keys</li>
              <li>House / apartment keys </li>
              <li>Laptops & tablets </li>
              <li>Phones </li>
              <li>Cameras </li>
              <li>Document files with documents </li>
              <li>Passport </li>
              <li>Backpacks, wallets and handbags</li>
            </ul>
          </FAQItem>
          <FAQItem question="What if my Loca8 locket is stolen?">
            The privacy of the tag is intact as the QR code on the Loca8 locket is unique and it is not transferable. It
            is registered under your email ID.
          </FAQItem>
          <FAQItem question="Can I register more than 1 Loca8 locket under one e-mail ID?">
            Yes, you can register multiple tags and the dashboard displays all the Tag IDs and the status.
          </FAQItem>
        </main>
        <Footer></Footer>
      </div>
    </>
  )
}
