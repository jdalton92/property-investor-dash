import React from "react";
import { useHistory } from "react-router-dom";

const PrivacyPolicy = () => {
  const history = useHistory();
  const handleLink = (url) => {
    history.push(url);
  };

  return (
    <>
      <h1 className="my-2 text-2xl font-semibold">Privacy Policy</h1>
      <div className="shadow-xl rounded-2xl p-4 bg-white my-2">
        <p className="mb16">
          PropertyInvestorDash is committed to providing quality services to you
          and this policy outlines our ongoing obligations to you in respect of
          how we manage your Personal Information. We have adopted the
          Australian Privacy Principles (APPs) contained in the Privacy Act 1988
          (Cth) (the Privacy Act). The NPPs govern the way in which we collect,
          use, disclose, store, secure and dispose of your Personal Information.
          A copy of the Australian Privacy Principles may be obtained from the
          website of The Office of the Australian Information Commissioner at{" "}
          <a
            className="cursor-pointer underline text-blue-800"
            href="https://www.aoic.gov.au"
          >
            www.aoic.gov.au
          </a>
        </p>
        <h2 className="my-2 text-l font-semibold">What is Personal</h2>
        <p className="mb-4">
          Information and why do we collect it? Personal Information is
          information or an opinion that identifies an individual. Examples of
          Personal Information we collect include: names, addresses, email
          addresses, phone and facsimile numbers. This Personal Information is
          obtained via this website and from third parties.
        </p>
        <p className="mb-4">
          We don’t guarantee website links or policy of authorised third
          parties. We collect your Personal Information for the primary purpose
          of providing our services to you, providing information to our clients
          and marketing. We may also use your Personal Information for secondary
          purposes closely related to the primary purpose, in circumstances
          where you would reasonably expect such use or disclosure. You may
          unsubscribe from our mailing/marketing lists at any time by contacting
          us in writing.
        </p>
        <p className="mb-4">
          When we collect Personal Information we will, where appropriate and
          where possible, explain to you why we are collecting the information
          and how we plan to use it.
        </p>
        <h2 className="my-2 text-l font-semibold">Sensitive Information</h2>
        <p className="mb-4">
          Sensitive information is defined in the Privacy Act to include
          information or opinion about such things as an individual's racial or
          ethnic origin, political opinions, membership of a political
          association, religious or philosophical beliefs, membership of a trade
          union or other professional body, criminal record or health
          information.
        </p>
        <div className="mb-4">
          Sensitive information will be used by us only:
          <ul className="list-inside list-disc">
            <li>For the primary purpose for which it was obtained</li>
            <li>
              For a secondary purpose that is directly related to the primary
              purpose
            </li>
            <li>With your consent; or where required or authorised by law</li>
          </ul>
        </div>
        <h2 className="my-2 text-l font-semibold">Third Parties</h2>
        <p className="mb-4">
          Where reasonable and practicable to do so, we will collect your
          Personal Information only from you. However, in some circumstances we
          may be provided with information by third parties. In such a case we
          will take reasonable steps to ensure that you are made aware of the
          information provided to us by the third party.
        </p>
        <h2 className="my-2 text-l font-semibold">
          Disclosure of Personal Information
        </h2>
        <div className="mb-4">
          Your Personal Information may be disclosed in a number of
          circumstances including the following:
          <ul className="list-inside list-disc">
            <li>
              Third parties where you consent to the use or disclosure; and
            </li>
            <li>Where required or authorised by law</li>
          </ul>
        </div>
        <h2 className="my-2 text-l font-semibold">
          Security of Personal Information
        </h2>
        <p className="mb-4">
          Your Personal Information is stored in a manner that reasonably
          protects it from misuse and loss and from unauthorized access,
          modification or disclosure.
        </p>
        <p className="mb-4">
          When your Personal Information is no longer needed for the purpose for
          which it was obtained, we will take reasonable steps to destroy or
          permanently de-identify your Personal Information.
        </p>
        <h2 className="my-2 text-l font-semibold">
          Access to your Personal Information
        </h2>
        <p className="mb-4">
          You may access the Personal Information we hold about you and to
          update and/or correct it, subject to certain exceptions. If you wish
          to access your Personal Information, please contact us in writing.
        </p>
        <p className="mb-4">
          PropertyInvestorDash will not charge any fee for your access request,
          but may charge an administrative fee for providing a copy of your
          Personal Information. In order to protect your Personal Information we
          may require identification from you before releasing the requested
          information.
        </p>
        <h2 className="my-2 text-l font-semibold">
          Maintaining the Quality of your Personal Information
        </h2>
        <p className="mb-4">
          It is an important to us that your Personal Information is up to date.
          We will take reasonable steps to make sure that your Personal
          Information is accurate, complete and up-to-date. If you find that the
          information we have is not up to date or is inaccurate, please advise
          us as soon as practicable so we can update our records and ensure we
          can continue to provide quality services to you.
        </p>
        <h2 className="my-2 text-l font-semibold">Policy Updates</h2>
        <p className="mb-4">
          This Policy may change from time to time and is available on our
          website.
        </p>
        <h2 className="my-2 text-l font-semibold">
          Privacy Policy Complaints and Enquiries
        </h2>
        <p className="mb-4">
          If you have any queries or complaints about our Privacy Policy please
          contact us using our{" "}
          <span
            className="cursor-pointer underline text-blue-800"
            onClick={() => handleLink("/contact")}
          >
            contact form
          </span>
        </p>
      </div>
    </>
  );
};

export default PrivacyPolicy;
