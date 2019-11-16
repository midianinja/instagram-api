import puppeteer from 'puppeteer';

const headers = {
  'Access-Control-Allow-Credentials': true,
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json',
};

/**
 * function that save a user on database
 * @param  {object} event request params
 * @param  {object} event.pathParameters uri parameters
 * @param  {object} event.pathParameters.user it is the instagram user
 * @returns {object} containt status, success data with photos or error
 */
export const getPhotos = async (event) => {
  const { user } = event.pathParameters;
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(`https://instagram.com/${user}/`);
  const imageLinks = await page.evaluate(() => {
    // eslint-disable-next-line no-undef
    const elements = [...document.querySelectorAll('a > div > div > img')];
    return elements.map(element => element.src);
  });

  await browser.close();
  if (!imageLinks.length) {
    return ({
      statusCode: 400,
      headers,
      body: JSON.stringify({ status: 'instagram-photos/not-available-data' }),
    });
  }

  return ({
    statusCode: 200,
    headers,
    body: JSON.stringify({ status: 'instagram-photos/success', data: imageLinks }),
  });
};


export const ignore = () => null;
