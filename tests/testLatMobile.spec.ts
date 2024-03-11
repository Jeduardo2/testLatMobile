import { test, expect } from '@playwright/test';

test ('test01', async ({ page }) => {

  //Navegamos al sitio indicado
  await page.goto('https://demo.casino/');

  //esperamos que cargue el modal al cargar el sitio y lo cerramos
  await page.waitForSelector('.modal__content');
  await page.click('.mfp-close');

  //nos dirigimos al enlace de registro
  await page.click('a[href="/user/registration"]');

  //se selecciona la opcion de correo
  await page.click('li[data-index="0"].selected');

  //Se crea una variable para crear un correo random y se escribe el correo creado para su registro
  const ramEmail = `user${Math.random().toString(36).substring(7)}@gmail.com`;
  const emailInput = await page.locator('[placeholder="Email"]');
  await emailInput.fill(ramEmail);
  
  //Se Localiza el elemento por su XPath
  const labelConditions = await page.locator('//*[@id="registration_form_1"]/fieldset[2]/div[1]/div/label');
  //clic en el elemento para aceptar los terminos y condiciones
  await labelConditions.click();

  //Se selecciona la opcion de no Bonus, ya q no se tiene codigo de promocion
  await page.click('label.special-radio__label[for="bonus-0"]');

  //Seleccionamos y navegamos por elemento para elegir la moneda
  await page.locator('fieldset').filter({ hasText: 'I unconditionally agree with' }).locator('b').click();
  await page.locator('[data-test="form-registration_form_1"] li').filter({ hasText: 'EUR' }).click();
  
  //Se crea una variable para generar un password Ramdon, el cual se usa para dicho proposito
  const ramPass = `Pass_1${Math.random().toString(36).substring(7)}`;
  const passInput = await page.locator('[data-test="input-password"]');
  await passInput.fill(ramPass);

  //Se reconfirma el password
  const passInputC = await page.locator('[data-test="input-password_confirmation"]');
  await passInputC.fill(ramPass);

  //Se procede a dar click en el boton de crear cuenta
  await page.locator('[data-test="control-submit"]').click();

  //se deja la pagina abieta para mostrar que se creo la cuenta
  await page.pause();

   // Cierra el navegador al finalizar la prueba
   //await page.close();
});
