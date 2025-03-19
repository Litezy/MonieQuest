const { Socials, webName } = require('../utils/utils')
const sendMail = require('./emailConfig')
require('dotenv').config()

const Mailing = async ({ eTitle, eBody, account, subject }) => {

    const content = `
        <div style="padding-right: 1rem; padding-left: 1rem; margin-top: 2.5rem; background-color: #172029">
          <div><img src='https://res.cloudinary.com/dnz3cbnxr/image/upload/v1738016210/myfolder/foppuz8fbw7sxdymspgb.png'  style="width: auto; height: 3.5rem"/></div>
          <div style="padding-top: 1.2rem; padding-bottom: 1.2rem; border-top: 1px solid #00fe5e; color:#ffff;  margin-top: 1rem">
             <div style="font-size: 1.1rem; font-weight: bold">${eTitle}</div>
             <div style="margin-top: 1rem">${eBody}</div>
          </div>
          <div style="margin-top: 2rem; padding-top: 1rem; padding-bottom: 1rem; border-top: 1px solid #00fe5e;">
             <div style="font-weight: bold; color: #00fe5e; text-align: center">Stay connected!</div>
             <div style="margin-top: 1rem">
                 <a href=${Socials.fb} style="padding-left: 6rem"><img src='https://res.cloudinary.com/dnz3cbnxr/image/upload/v1725461777/myfolder/jhjssvvwqe85g7m6ygoj.png' style="width: 1.2rem; height: 1.2rem" /></a>
                 <a href=${Socials.ig} style="padding-left: 1rem"><img src='https://res.cloudinary.com/dnz3cbnxr/image/upload/v1725461786/myfolder/kbkwpgdzajsmlidyserp.png' style="width: 1rem; height: 1rem" /></a>
                 <a href=${Socials.x} style="padding-left: 1rem"><img src='https://res.cloudinary.com/dnz3cbnxr/image/upload/v1738976416/myfolder/nnbu6j1m3kfffhvldd7t.png' style="width: 1.2rem; height: 1.2rem" /></a>
                 <a href=${Socials.tg} style="padding-left: 1rem"><img src='https://res.cloudinary.com/dnz3cbnxr/image/upload/v1725461793/myfolder/sea7fie6r1mndax4ent8.png' style="width: 1rem; height: 1rem" /></a>
             </div>
             <div style="margin-top: 1rem; color:#e1e1e1; font-size: 0.85rem">If you have any questions or suggestions, please feel free to contact us via our 24/7 online help or email: officialmoniequest@gmail.com</div>
             <div style="margin: 2rem auto 0rem ;  width: 70%; height: fit-content; background-color: #ffff; color: black; font-size: 0.85rem; padding: 0.75rem 2.5rem">
                 <div style="width: 100%; display: flex ; align-items: center; gap: 0.5rem; justify-content:center ">
                 <div>
                 <img src='https://res.cloudinary.com/dnz3cbnxr/image/upload/v1725463522/qjtwmzzj6orqraedef04.png'  style="width: 0.75rem; height: fit;  padding-right: 0.2rem" />
                  </div>
                 <div>${webName} 2025, All rights reserved.</div>
                 </div>
              </div>
          </div>
        </div>
    `
    await sendMail({ subject: subject, to: account.email, html: content, text: content, })
}

module.exports = Mailing
