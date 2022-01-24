module.exports = ({ clientName, phoneNumber, clientEmail, clientSign, managerSign }) => {
    const today = new Date();
return `
    <p style="text-align: center;"><strong>МЕЖДУНАРОДНЫЙ УНИВЕРСИТЕТ ИНФОРМАЦИОННЫХ ТЕХНОЛОГИЙ</strong></p>
    <p>&nbsp;</p>
    <p>&nbsp;</p>
    <p style="text-align: right;">И.о. зав. кафедрой</p>
    <p style="text-align: right;">&laquo;Информационные системы&raquo;&nbsp;</p>
    <p style="text-align: right;">к.т.н., ассоц. проф. &nbsp;Сатыбалдиевой Р.Ж. от магистранта первого года обучения</p>
    <p style="text-align: right;">ОП <span>Управление IT проектами</span></p>
    <p style="text-align: right;"><u>${clientName}</u></p>
    <p style="text-align: right;"><em>ФИО магистранта</em></p>
    <p style="text-align: right;">Тел.: <u>${phoneNumber}</u></p>
    <p style="text-align: right;">e-mail: <u>${clientEmail}</u></p>
    <p style="text-align: right;">Группа: <u>ITPM</u><u> &ndash; 214</u><u>M</u></p>
    <p>&nbsp;</p>
    <p style="text-align: center;"><strong>Заявление</strong></p>
    <p>&nbsp;</p>
    <p>&nbsp;</p>
    <p style="text-align: justify;">Прошу утвердить тему моей магистерской диссертации:</p>
    <p style="text-align: justify;">&nbsp;</p>
    <p style="text-align: justify;">на казахском языке &laquo;Чатбот операциясының нәтижелері бойынша шешім қабылдау жүйесін құру (бизнес үшін: диспетчерлік өндіріс пен логистика, сонымен қатар төлем жүйесі үшін)&raquo;</p>
    <p style="text-align: justify;">на английском языке &laquo;Creation of a decision-making system based on the results of the chatbot operation (for business: dispatching production and logistics, as well as for the payment system&raquo;</p>
    <p style="text-align: justify;">на русском языке &laquo;Создание системы принятия решений по результатам работы чат-бота (для бизнеса: диспетчеризации производства и логистики, а также для платежной системы)&raquo;</p>
    <p style="text-align: justify;">&nbsp;</p>
    <p style="text-align: justify;">и назначить научным руководителем: к.ф.-м.н., и.о. профессора Куандыкова А.А.</p>
    <p style="text-align: justify;">&nbsp;</p>
    <p>&nbsp;</p>
    <p>&nbsp;</p>
    <p>&nbsp;</p>
    <p style="text-align: right;">&nbsp; Дата <u>08.10.2021</u>&nbsp; &nbsp;Подпись <u>${clientSign}</u></p>
    <p style="text-align: right;">&nbsp;</p>
    <p style="text-align: right;"></p>
    <p style="text-align: right;">Научный руководитель</p>
    <p style="text-align: right;">__<u>Куандыков А.А.&nbsp; &nbsp; </u>&nbsp; &nbsp; <u>${managerSign}</u></p>
    <p style="text-align: right;"><em>ФИО&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; подпись</em></p>
    `;
};

/*<!doctype html>
    <html>
       <head>
          <meta charset="utf-8">
          <title>PDF Result Template</title>
          <style>
             .invoice-box {
             max-width: 800px;
             margin: auto;
             padding: 30px;
             border: 1px solid #eee;
             box-shadow: 0 0 10px rgba(0, 0, 0, .15);
             font-size: 16px;
             line-height: 24px;
             font-family: 'Helvetica Neue', 'Helvetica',
             color: #555;
             }
             .margin-top {
             margin-top: 50px;
             }
             .justify-center {
             text-align: center;
             }
             .invoice-box table {
             width: 100%;
             line-height: inherit;
             text-align: left;
             }
             .invoice-box table td {
             padding: 5px;
             vertical-align: top;
             }
             .invoice-box table tr td:nth-child(2) {
             text-align: right;
             }
             .invoice-box table tr.top table td {
             padding-bottom: 20px;
             }
             .invoice-box table tr.top table td.title {
             font-size: 45px;
             line-height: 45px;
             color: #333;
             }
             .invoice-box table tr.information table td {
             padding-bottom: 40px;
             }
             .invoice-box table tr.heading td {
             background: #eee;
             border-bottom: 1px solid #ddd;
             font-weight: bold;
             }
             .invoice-box table tr.details td {
             padding-bottom: 20px;
             }
             .invoice-box table tr.item td {
             border-bottom: 1px solid #eee;
             }
             .invoice-box table tr.item.last td {
             border-bottom: none;
             }
             .invoice-box table tr.total td:nth-child(2) {
             border-top: 2px solid #eee;
             font-weight: bold;
             }
             @media only screen and (max-width: 600px) {
             .invoice-box table tr.top table td {
             width: 100%;
             display: block;
             text-align: center;
             }
             .invoice-box table tr.information table td {
             width: 100%;
             display: block;
             text-align: center;
             }
             }
          </style>
       </head>
       <body>
          <div class="invoice-box">
             <table cellpadding="0" cellspacing="0">
                <tr class="top">
                   <td colspan="2">
                      <table>
                         <tr>
                            <td class="title"><img  src="https://i2.wp.com/cleverlogos.co/wp-content/uploads/2018/05/reciepthound_1.jpg?fit=800%2C600&ssl=1"
                               style="width:100%; max-width:156px;"></td>
                            <td>
                               Datum: ${`${today.getDate()}. ${today.getMonth() + 1}. ${today.getFullYear()}.`}
                            </td>
                         </tr>
                      </table>
                   </td>
                </tr>
                <tr class="information">
                   <td colspan="2">
                      <table>
                         <tr>
                            <td>
                               Customer name: ${name}
                            </td>
                            <td>
                               Receipt number: ${receiptId}
                            </td>
                         </tr>
                      </table>
                   </td>
                </tr>
                <tr class="heading">
                   <td>Bought items:</td>
                   <td>Price</td>
                </tr>
                <tr class="item">
                   <td>First item:</td>
                   <td>${price1}$</td>
                </tr>
                <tr class="item">
                   <td>Second item:</td>
                   <td>${price2}$</td>
                </tr>
             </table>
             <br />
             <h1 class="justify-center">Total price: ${parseInt(price1) + parseInt(price2)}$</h1>
          </div>
       </body>
    </html>*/