import {Helmet } from 'react-helmet-async'
const Meta = ( { title, description, keywords }) => {
  return (
    <Helmet>
      <title>ProShop</title>
      <meta name='description' content={description} />
      <meta name='keywords' content={keywords} />
    </Helmet>
  )
}

Meta.defaultProps = {
  title: 'Welcome To ProShop',
  description: 'We sell the best products for cheap',
  keywords: 'buy, offers, products'
}


export default Meta