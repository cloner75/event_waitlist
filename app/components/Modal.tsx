import Image from 'next/image';

const termsText = `
            Effective Date: February 2025

Welcome to the Dopin Early Access Waitlist (“Waitlist”).
By registering with your phone number and participating, you agree to these Terms of Use.

If you do not agree, do not use the Waitlist.
1. Overview

This Waitlist allows users to earn points by inviting friends.
Only the top 200 users on the leaderboard will receive Early Access to Dopin before public launch.

Participation is voluntary, and Early Access is not guaranteed.
2. Eligibility

To join, you must:
be at least 18 years old
register using a valid phone number
use one account per person
live in or be located in San Francisco (this Early Access round is SF-only)

We may verify or remove suspicious or duplicate accounts.
3. How the Waitlist Works

Users earn points only through inviting friends.
Each valid invite equals +20 points.

A “valid invite” means:
your friend joins the waitlist using your unique link
they register using a real phone number
they are not a duplicate or fake account

Dopin may adjust or remove points if fraud or manipulation is detected.
4. Leaderboard

The leaderboard shows:
your masked phone number (example: --3131)
your points
your ranking position

Full phone numbers are never displayed.

Leaderboard ranking is updated periodically and may change as new users join.
5. Early Access Rules

Only the top 200 users on the leaderboard at the cutoff date will receive Early Access.

Dopin reserves the right to:
adjust rankings
disqualify users for fraud
change the number of Early Access spots
modify the end date of the competition

We make all final decisions regarding Early Access eligibility.
6. Prohibited Behavior

You agree NOT to:
create multiple accounts
use fake or temporary phone numbers
artificially inflate points
invite yourself
use bots or automated tools
attempt to hack, manipulate, or interfere with the system

Violations may result in removal from the Waitlist.
7. No Warranties

The Waitlist is provided “AS IS” with no guarantees.
We do not guarantee:
uninterrupted service
accurate leaderboard ranking
valid tracking of all invites
that you will receive Early Access
8. Limitation of Liability

Dopin is not responsible for:
loss of points
leaderboard errors
technical issues
failure to receive Early Access

Participation is at your own risk.
9. Governing Law & Dispute Resolution

These Terms are governed by the laws of California.
Any dispute must be resolved through binding arbitration in San Francisco County, following AAA rules.

You agree not to join any class-action lawsuit against Dopin.
10. Changes to These Terms

We may update these Terms at any time.
We will update the “Effective Date” when changes occur.
11. Contact

For questions:
legal@dopin.io`;
const privayText = `
Effective Date: February 2025

This Privacy Policy explains how Dopin collects and uses your information on the Early Access Waitlist.

This waitlist is extremely simple — we only use phone numbers and invite tracking.
1. Information We Collect

Required Information
Your phone number (for registration)

Automatically Used for Display
A masked version of your phone number (example: --3131)
shown only on the public leaderboard

Referral Information
When someone registers through your invite link
The fact that an invite occurred
Points earned from invites

We do NOT collect names, emails, locations, or other personal information.
2. How We Use Your Information

We use your phone number to:
create your waitlist entry
assign points for valid invites
calculate and update your leaderboard rank
display a masked version of your number on the leaderboard
notify you if you earn Early Access (optional SMS)

We do NOT:
sell your data
share your phone number publicly
use your number for third-party advertising
3. How Your Phone Number Appears Publicly

On the leaderboard, your number is masked like this:
***-***-3131

Only the last 2–4 digits may appear.
The full number is never shown.
4. How We Share Your Information

We do not sell your information.
We only share your phone number with trusted service providers necessary to operate the waitlist, such as:
SMS verification services
database hosting providers
analytics (non-identifying)

These providers cannot use your data for anything else.
5. Cookies & Analytics

We may use basic website analytics to track:
site performance
referral link usage
page traffic

No identifying personal data is collected beyond your phone number.
6. Data Security

We use reasonable security practices to protect your phone number.
No system is completely secure, but we aim to safeguard your data.
7. Data Retention

We keep your phone number as long as the Waitlist is active.
If you gain Early Access, we may keep it for onboarding purposes.

You may request deletion anytime.
8. Your Rights

You may request:
deletion of your phone number
correction of errors
clarification of data usage

Email: privacy@dopin.io
9. Children’s Privacy

This Waitlist is for users 13+ only.
We do not knowingly collect data from minors.
10. Changes to This Policy

We may update this policy.
The “Effective Date” will reflect changes.
11. Contact

For privacy questions:
privacy@dopin.io`;
export default function Modal({
  name = 'terms',
  isOpen = false,
  onClose,
}: {
  name: 'terms' | 'privacy' | undefined;
  isOpen: boolean;
  onClose: () => any;
}) {
  return isOpen != undefined ? (
    <div
      className={`top-0 left-0 backdrop-blur-3xl bg-[#11111183] py-[27px] h-screen w-screen fixed z-100`}
    >
      <div className="bg-[#0B0B0B] h-full mx-auto overflow-hidden rounded-[51px] p-[27] xl:max-w-[918px] max-w-[90%]">
        <div className="flex flex-none mb-[50px] gap-10 items-center">
          <div className="cursor-pointer" onClick={onClose}>
            <Image
              alt=""
              className="w-full h-auto"
              src="/images/close.svg"
              width={40}
              height={40}
            />
          </div>
          <div className="flex-1 text-white  text-[32px] font-black">
            TERMS OF USE — Dopin Early Access Waitlist
          </div>
        </div>
        <div className="h-[85%] overflow-y-scroll">
          <pre className="xl:px-[34px] px-[25px] pb-[100px] font-light text-[16px] whitespace-pre-wrap break-words w-full text-white font-[SFProDisplay,_SFProDisplay_Fallback]">
            {name == 'privacy' ? privayText : termsText}
          </pre>
        </div>
      </div>
    </div>
  ) : undefined;
}
