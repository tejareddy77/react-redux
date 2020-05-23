import React, { useEffect, useState, Fragment} from 'react';
import { connect } from 'react-redux';
import { fetchRestaurants } from '../redux';
import axios from 'axios'


function RestaurantsContainer({ restaurantData, fetchRestaurants }) {

  const [city, setCity] = useState("Toronto");
  const [refine, setRefine] = useState("");
  const [cities, setCities] = useState([]);
  var Typeahead = require('react-typeahead').Typeahead;

  console.log(restaurantData.restaurants)
  useEffect(() => {
    fetchRestaurants(city)

    axios
    .get('https://opentable.herokuapp.com/api/cities')
    .then(response => {
      setCities(response.data.cities)
    })
    .catch(error => {
      console.log(error)
    })


  }, [])
  
  return restaurantData.loading ? (
    <div class="container"><h4>Loading..</h4></div>
  ) : restaurantData.error ? (
    <h2>{ restaurantData.error }</h2>
  ) : (

    <div class="container">
      <h2>{city} Restaurant List</h2>
      <div class="row">
        <div class="column">
          <Typeahead options={cities} maxVisible={5} placeholder="Search City"  onOptionSelected={(city) =>{
          setCity(city)
          setRefine("")
          fetchRestaurants(city);
        }} />
        </div>
        <div class="column">
          <input value={refine} placeholder="Refine" onChange={(e) => {
                          setRefine(e.target.value);                          
                        }}  />
        </div>
      </div>
     
      <div>
        { restaurantData && restaurantData.restaurants &&
          <table className="res-table">
            <thead>
              <tr>
                <th>Restaurant Name</th>
                <th>Address</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              { restaurantData.restaurants.map(res => {

                  if( res.name.toLowerCase().includes(refine.toLowerCase()) || res.area.toLowerCase().includes(refine.toLowerCase()) || res.address.toLowerCase().includes(refine.toLowerCase())){
                    return (<tr><td>{res.name}</td><td>{res.address}</td><td>{res.price}</td></tr>)
                  }

                }
              )}
            </tbody>
          </table>
        }
      </div>
    </div>
  )
}

const mapStateToProps = (state, city) => {
  return {
    restaurantData: state,
    city: city
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchRestaurants: (city) => dispatch( fetchRestaurants(city) )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RestaurantsContainer)