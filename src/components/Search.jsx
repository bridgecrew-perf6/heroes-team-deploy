import React, { useState } from 'react';
import { Formik, Field, Form } from 'formik';
import axios from 'axios';
import { HeroCard } from './HeroCard';

export const Search = ({ heroTeam, setHeroTeam }) => {
  const [serverError, setServerError] = useState(null);
  const [search, setSearch] = useState([]);
  const handleSubmit = async value => {
    try {
      const response = await axios({
        method: 'GET',
        url: `https://superheroapi.com/api.php/380601706991561/search/${value.search}`,
        data: {
          search: value.search,
        },
      });
      setSearch(response.data.results);
    } catch (error) {
      setServerError('No such hero with that name');
    }
  };
  return (
    <div className="m-5">
      <div>
        <div className="row">
          <div>
            <h4>Search:</h4>
            <hr />
            <Formik
              onSubmit={handleSubmit}
              validate={value => {
                const errors = {};
                if (!value.search) {
                  errors.search = 'Required';
                }
                return errors;
              }}
              initialValues={{
                search: '',
              }}
            >
              {({ errors, isValid, touched }) => (
                <Form>
                  <div className="d-flex m-3 align-items-center">
                    <Field
                      type="search"
                      className="form-control m-1"
                      name="search"
                      placeholder="Search a hero by name"
                      autoComplete="off"
                    />
                    {errors.search && touched.search ? (
                      <div className="text-danger">{errors.search}</div>
                    ) : null}
                    <button
                      type="submit"
                      className="btn btn-primary m-1"
                      disabled={!isValid}
                    >
                      Search
                    </button>
                  </div>
                  {serverError ? (
                    <div className="text-danger">{serverError}</div>
                  ) : null}
                </Form>
              )}
            </Formik>
            <div className="d-flex flex-wrap m-3">
              {search ? (
                search.map(hero => (
                  <HeroCard
                    className="card m-3"
                    key={hero.id}
                    hero={hero}
                    setHeroTeam={setHeroTeam}
                    heroTeam={heroTeam}
                  />
                ))
              ) : (
                <p className="text-danger">
                  No results. Please enter a valid name
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
