import { Container, Section } from "@/components";

const H3 = (props: { children: any }) => {
  return <h3 className="heading-3 mb-2">{props.children}</h3>;
};

const P = (props: { children: any }) => {
  return <p className="para-1 mb-4">{props.children}</p>;
};

const points = [
  {
    num: 1,
    head: "Interpretation",
    desc: "The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.",
  },
  {
    num: 2,
    head: "Definitions",
    desc: 'For the purposes of this Return and Refund Policy:\nCompany (referred to as either "the Company", "We", "Us" or "Our" in this Agreement) refers to Rejoy Health, 600 California St, San Francisco, CA.\nGoods refer to the items offered for sale on the Service.\nOrders mean a request by You to purchase Goods from Us.\nService refers to the Website.\nWebsite refers to Rejoy Health, accessible from www.rejoyhealth.com.\nYou means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.',
  },
  {
    num: 3,
    head: "Your Order Cancellation Rights",
    desc: "You are entitled to cancel Your Order within 14 days without giving any reason for doing so. The deadline for cancelling an Order is 14 days from the date on which You received the Goods or on which a third party you have appointed, who is not the carrier, takes possession of the product delivered. In order to exercise Your right of cancellation, You must inform Us of your decision by means of a clear statement. You can inform us of your decision by:\nBy email: dev@rejoyhealth.com\nBy visiting this page on our website: www.rejoyhealth.com\nWe will reimburse You no later than 14 days from the day on which We receive the returned Goods. We will use the same means of payment as You used for the Order, and You will not incur any fees for such reimbursement.",
  },
  {
    num: 4,
    head: "Conditions For Returns",
    desc: "Any Digital Services membership may start with a free trial. The free trial period for any subscription will last for the period of time specified when you signed up. Free trials may not be combined with certain other offers, as specified. If you begin your subscription within a free trial, we may begin billing You for periodical membership fees at the time of subscription purchase or at the end of the free trial period unless you cancel your membership prior to the end of the free trial period, at our sole discretion. You agree to pay for all fees and charges incurred while using the Digital Services and the Platform Services. Additional taxes or third party charges may apply. You may be offered (a) pay per session; (b) subscription options, which could be monthly, quarterly, half yearly, annual, recurring, non-recurring subscription options. For the purposes of our weekly, monthly and yearly subscriptions, a week constitutes 7 calendar days, a month constitutes 30 calendar days and a year constitutes 365 calendar days. Non-recurring subscription(s) are non-cancellable. However, You may cancel your recurring subscription(s) at any time by going to your Account Settings and cancelling your subscription before the respective renewal date to avoid billing of the next period's subscription fee to the Payment Detail you have provided. Refunds cannot be claimed for any partial-term subscription period. Any promotion code or offer provided may not be used in conjunction with any other promotion code or offer, past or present. Introductory offers are only available to new users of the Platform, except where expressly stated otherwise. Previous users, including those having only booked / utilised trial services, or trial users of the Platform do not qualify as new users. No promotion code or discount will apply to any services / products unless otherwise stated on the Platform. Unless otherwise set forth in the terms of any promotion, all pricing promotions or discounts will apply to the initial period of the subscription, and any renewals will be charged at the non-discounted rate for the type of subscription or membership purchased. In order for the Goods to be eligible for a return, please make sure that: The Goods were purchased in the last 14 days The following Goods cannot be returned: The supply of Goods made to Your specifications or clearly personalized. The supply of Goods which according to their nature are not suitable to be returned, deteriorate rapidly or where the date of expiry is over. The supply of Goods which are not suitable for return due to health protection or hygiene reasons and were unsealed after delivery. The supply of Goods which are, after delivery, according to their nature, inseparably mixed with other items. We reserve the right to refuse returns of any merchandise that does not meet the above return conditions in our sole discretion. Only regular priced Goods may be refunded. Unfortunately, Goods on sale cannot be refunded. This exclusion may not apply to You if it is not permitted by applicable law.",
  },
  {
    num: 5,
    head: "Returning Goods",
    desc: "You are responsible for the cost and risk of returning the Goods to Us. You should send the Goods at the following address: dev@rejoyhealth.com. We cannot be held responsible for Goods damaged or lost in return shipment. Therefore, We recommend an insured and trackable mail service. We are unable to issue a refund without actual receipt of the Goods or proof of received return delivery.",
  },
  {
    num: 6,
    head: "Gifts",
    desc: "If the Goods were marked as a gift when purchased and then shipped directly to you, You'll receive a gift credit for the value of your return. Once the returned product is received, a gift certificate will be mailed to You. If the Goods weren't marked as a gift when purchased, or the gift giver had the Order shipped to themselves to give it to You later, We will send the refund to the gift giver.",
  },
  {
    num: 7,
    head: "Contact Us",
    desc: "If you have any questions about our Returns and Refunds Policy, please contact us: \nBy email: dev@rejoyhealth.com \nBy visiting this page on our website: www.rejoyhealth.com",
  },
];

export default function LandingPages() {
  return (
    <>
      <div className="bg-[#eaf4f7] pt-[210px] pb-[60px]">
        <Container>
          <h1 className="heading-1"> Terms of Service</h1>
          <p className="para-1">
            Last updated: February 19, 2021 <br />
            Thank you for shopping at Rejoy Health. <br />
            If, for any reason, You are not completely satisfied with a purchase
            We invite You to review our policy on refunds and returns. <br />
            The following terms are applicable for any products that You
            purchased with Us.
          </p>
        </Container>
      </div>
      <Section>
        <Container>
          {points.map((point) => (
            <div key={point.num}>
              <div className="flex mb-2">
                <H3>{point.num}.</H3>
                <H3>{point.head}</H3>
              </div>
              <P>{point.desc}</P>
            </div>
          ))}
        </Container>
      </Section>
    </>
  );
}
