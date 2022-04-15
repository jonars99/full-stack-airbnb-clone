import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Layout from '@src/Layout';
import { handleErrors } from '@utils/fetchHelper';
import './home.scss';

const Home = () => {

  const [ homePageData, setHomePageData ] = useState(
    {
      properties: [],
      total_pages: null,
      next_page: null,
      loading: true,
    }
  )

  useEffect(() => {
    fetch('/api/properties?page=1')
      .then(handleErrors)
      .then(data => {
        setHomePageData({
          properties: data.properties,
          total_pages: data.total_pages,
          next_pages: data.next_page,
          loading: false,
        })
      })
  }, [])

  return (
    <Layout>
      <div className="container pt-4">
        <h4 className="mb-1">Top-rated places to stay</h4>
        <p className="text-secondary mb-3">Explore some of the best-reviewed stays in the world</p>

        <div className="row">
          {homePageData.properties.map(property => {
            return (
              <div key={property.id} className="col-6 col-lg-4 mb-4 property">
                <a href={`/property/${property.id}`} className="text-body text-decoration-none">
                  <div className="property-image mb-1 rounded" style={{
                    backgroundImage: `url(${property.image_url})` }} ></div>
                  <p className="text-uppercase mb-0 text-secondary"><small><b>{property.city}</b></small></p>
                  <h6 className="mb-0">{property.title}</h6>
                  <p className="mb-0"><small>${property.per_per_night} USD/night</small></p>
                </a>
              </div>
            )
          })}
        </div>

        {homePageData.loading && <p className="text-center py-3">loading...</p>}

      </div>
    </Layout>
  )
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Home />,
    document.body.appendChild(document.createElement('div')),
  )
})
