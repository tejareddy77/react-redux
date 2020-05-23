import axios from 'axios'
import {
  FETCH_RESTAURANTS_REQUEST,
  FETCH_RESTAURANTS_SUCCESS,
  FETCH_RESTAURANTS_FAILURE
} from './restaurantTypes'


export const fetchRestaurants = (city) => {
  return (dispatch) => {
    dispatch(fetchRestaurantsRequest())
    axios
      .get('https://opentable.herokuapp.com/api/restaurants?city=' + city)
      .then(response => {
        const restaurants = response.data.restaurants

        var filteredRestaurants = []

        restaurants.forEach(function(res){
          var obj = {}

          obj["name"] = res.name
          obj["address"] = res.address
          obj["area"] = res.area
          obj["price"] = res.price
          
          filteredRestaurants.push(obj)

        })


        dispatch(fetchRestaurantsSuccess(filteredRestaurants))
      })
      .catch(error => {
        // error.message is the error message
        dispatch(fetchRestaurantsFailure(error.message))
      })
  }
}

export const fetchRestaurantsRequest = () => {
  return {
    type: FETCH_RESTAURANTS_REQUEST
  }
}

export const fetchRestaurantsSuccess = restaurants => {
  return {
    type: FETCH_RESTAURANTS_SUCCESS,
    payload: restaurants
  }
}

export const fetchRestaurantsFailure = error => {
  return {
    type: FETCH_RESTAURANTS_FAILURE,
    payload: error
  }
}