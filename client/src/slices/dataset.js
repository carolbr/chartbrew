import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { getAuthToken } from "../modules/auth";
import { API_HOST } from "../config/settings";

const initialState = {
  loading: false,
  error: false,
  data: [],
  responses: [],
};

export const getDatasets = createAsyncThunk(
  "dataset/getDatasets",
  async ({ team_id }) => {
    const token = getAuthToken();
    const url = `${API_HOST}/team/${team_id}/datasets`;
    const method = "GET";
    const headers = new Headers({
      "Accept": "application/json",
      "Authorization": `Bearer ${token}`,
    });

    const response = await fetch(url, { method, headers });
    if (!response.ok) {
      throw new Error("Failed to fetch datasets");
    }

    const responseJson = await response.json();

    return responseJson;
  }
);

export const getDataset = createAsyncThunk(
  "dataset/getDataset",
  async ({ team_id, dataset_id }) => {
    const token = getAuthToken();
    const url = `${API_HOST}/team/${team_id}/datasets/${dataset_id}`;
    const method = "GET";
    const headers = new Headers({
      "Accept": "application/json",
      "Authorization": `Bearer ${token}`,
    });

    const response = await fetch(url, { method, headers });
    if (!response.ok) {
      throw new Error("Failed to fetch datasets");
    }

    const responseJson = await response.json();

    return responseJson;
  }
);

export const saveNewDataset = createAsyncThunk(
  "dataset/saveNewDataset",
  async ({ team_id, data }) => {
    const token = getAuthToken();
    const url = `${API_HOST}/team/${team_id}/datasets`;
    const method = "POST";
    const body = JSON.stringify(data);
    const headers = new Headers({
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    });

    const response = await fetch(url, { method, body, headers });
    if (!response.ok) {
      throw new Error("Failed to fetch datasets");
    }

    const responseJson = await response.json();

    return responseJson;
  }
);

export const updateDataset = createAsyncThunk(
  "dataset/updateDataset",
  async ({ team_id, dataset_id, data }) => {
    const token = getAuthToken();
    const url = `${API_HOST}/team/${team_id}/datasets/${dataset_id}`;
    const method = "PUT";
    const body = JSON.stringify(data);
    const headers = new Headers({
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    });

    const response = await fetch(url, { method, body, headers });
    if (!response.ok) {
      throw new Error("Failed to fetch datasets");
    }

    const responseJson = await response.json();

    return responseJson;
  }
);

export const deleteDataset = createAsyncThunk(
  "dataset/deleteDataset",
  async ({ team_id, dataset_id }) => {
    const token = getAuthToken();
    const url = `${API_HOST}/team/${team_id}/datasets/${dataset_id}`;
    const method = "DELETE";
    const headers = new Headers({
      "Accept": "application/json",
      "Authorization": `Bearer ${token}`,
    });

    const response = await fetch(url, { method, headers });
    if (!response.ok) {
      throw new Error("Failed to fetch datasets");
    }

    const responseJson = await response.json();

    return responseJson;
  }
);

export const runRequest = createAsyncThunk(
  "dataset/runRequest",
  async ({ team_id, dataset_id, getCache }) => {
    const token = getAuthToken();
    let url = `${API_HOST}/team/${team_id}/datasets/${dataset_id}/request`;
    const method = "POST";
    const headers = new Headers({
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    });
    
    const body = {
      getCache,
    };

    let status = {
      statusCode: 500,
      statusText: "Internal Server Error",
    };

    let data;
    try {
      const response = await fetch(url, { method, headers, body: JSON.stringify(body) });
      status = {
        statusCode: response.status,
        statusText: response.statusText,
      };
      
      if (!response.ok) {
        data = await response.text();
      } else {
        data = await response.json();
      }
    } catch (error) {
      data = error;
    }

    return {
      ...data,
      status,
    };
  }
);

export const getDataRequestsByDataset = createAsyncThunk(
  "dataset/getDataRequestsByDataset",
  async ({ team_id, dataset_id }) => {
    const token = getAuthToken();
    const url = `${API_HOST}/team/${team_id}/datasets/${dataset_id}/dataRequests`;
    const method = "GET";
    const headers = new Headers({
      "Accept": "application/json",
      "Authorization": `Bearer ${token}`,
    });

    const response = await fetch(url, { method, headers });
    const responseJson = await response.json();

    return responseJson;
  }
);

export const createDataRequest = createAsyncThunk(
  "dataset/createDataRequest",
  async ({ team_id, dataset_id, data }) => {
    const token = getAuthToken();
    const url = `${API_HOST}/team/${team_id}/datasets/${dataset_id}/dataRequests`;
    const method = "POST";
    const body = JSON.stringify(data);
    const headers = new Headers({
      "Accept": "application/json",
      "Content-Type": "application/json",
      "authorization": `Bearer ${token}`,
    });

    const response = await fetch(url, { method, body, headers });
    const responseJson = await response.json();

    return responseJson;
  }
);

export const updateDataRequest = createAsyncThunk(
  "dataset/updateDataRequest",
  async ({ team_id, dataset_id, dataRequest_id, data }) => {
    const token = getAuthToken();
    const url = `${API_HOST}/team/${team_id}/datasets/${dataset_id}/dataRequests/${dataRequest_id}`;
    const method = "PUT";
    const body = JSON.stringify(data);
    const headers = new Headers({
      "Accept": "application/json",
      "Content-Type": "application/json",
      "authorization": `Bearer ${token}`,
    });

    const response = await fetch(url, { method, body, headers });
    const responseJson = await response.json();

    return responseJson;
  }
);

export const deleteDataRequest = createAsyncThunk(
  "dataset/deleteDataRequest",
  async ({ team_id, dataset_id, dataRequest_id }) => {
    const token = getAuthToken();
    const url = `${API_HOST}/team/${team_id}/datasets/${dataset_id}/dataRequests/${dataRequest_id}`;
    const method = "DELETE";
    const headers = new Headers({
      "Accept": "application/json",
      "authorization": `Bearer ${token}`,
    });

    const response = await fetch(url, { method, headers });
    const responseJson = await response.json();

    return responseJson;
  }
);

export const runDataRequest = createAsyncThunk(
  "dataset/runDataRequest",
  async ({ team_id, dataset_id, dataRequest_id, getCache }) => {
    const token = getAuthToken();
    let url = `${API_HOST}/team/${team_id}/datasets/${dataset_id}/dataRequests/${dataRequest_id}/request`;
    const method = "POST";
    const headers = new Headers({
      "Accept": "application/json",
      "Content-Type": "application/json",
      "authorization": `Bearer ${token}`,
    });

    const body = {};
    if (getCache) {
      body.getCache = getCache;
    }

    let status = {
      statusCode: 500,
      statusText: "Internal Server Error",
    };

    let data;
    try {
      const response = await fetch(url, { method, headers, body: JSON.stringify(body) });
      status = {
        statusCode: response.status,
        statusText: response.statusText,
      };

      if (!response.ok) {
        data = await response.text();
      } else {
        data = await response.json();
      }
    } catch (error) {
      data = error;
    }

    return {
      response: data,
      status,
    };
  }
);

export const getRelatedCharts = createAsyncThunk(
  "dataset/getRelatedCharts",
  async ({ team_id, dataset_id }) => {
    const token = getAuthToken();
    const url = `${API_HOST}/team/${team_id}/datasets/${dataset_id}/charts`;
    const method = "GET";
    const headers = new Headers({
      "Accept": "application/json",
      "authorization": `Bearer ${token}`,
    });

    const response = await fetch(url, { method, headers });
    const responseJson = await response.json();

    return responseJson;
  }
);

export const duplicateDataset = createAsyncThunk(
  "dataset/duplicateDataset",
  async ({ team_id, dataset_id, name }) => {
    const token = getAuthToken();
    const url = `${API_HOST}/team/${team_id}/datasets/${dataset_id}/duplicate`;
    const method = "POST";
    const headers = new Headers({
      "Accept": "application/json",
      "Content-Type": "application/json",
      "authorization": `Bearer ${token}`,
    });

    const body = JSON.stringify({ name });

    const response = await fetch(url, { method, headers, body });
    if (!response.ok) {
      throw new Error("Failed to duplicate dataset");
    }

    const responseJson = await response.json();

    return responseJson;
  }
);

export const deleteDrafts = createAsyncThunk(

  "dataset/deleteDrafts",
  async ({ team_id }) => {
    const token = getAuthToken();
    const url = `${API_HOST}/team/${team_id}/datasets/drafts`;
    const method = "DELETE";
    const headers = new Headers({
      "Accept": "application/json",
      "Authorization": `Bearer ${token}`,
    });
    
    const response = await fetch(url, { method, headers });
    if (!response.ok) {
      throw new Error("Failed to delete drafts");
    }

    const responseJson = await response.json();

    return responseJson;
  }
);

export const createDatasetVariableBinding = createAsyncThunk(
  "dataset/createDatasetVariableBinding",
  async ({ team_id, dataset_id, data }) => {
    const token = getAuthToken();
    const url = `${API_HOST}/team/${team_id}/datasets/${dataset_id}/variableBindings`;
    const method = "POST";
    const body = JSON.stringify(data);
    const headers = new Headers({
      "Accept": "application/json",
      "Content-Type": "application/json",
      "authorization": `Bearer ${token}`,
    });

    const response = await fetch(url, { method, headers, body });
    if (!response.ok) {
      throw new Error("Failed to create variable binding");
    }

    const responseJson = await response.json();

    return responseJson;
  }
);

export const updateDatasetVariableBinding = createAsyncThunk(
  "dataset/updateDatasetVariableBinding",
  async ({ team_id, dataset_id, variable_id, data }) => {
    const token = getAuthToken();
    const url = `${API_HOST}/team/${team_id}/datasets/${dataset_id}/variableBindings/${variable_id}`;
    const method = "PUT";
    const body = JSON.stringify(data);
    const headers = new Headers({
      "Accept": "application/json",
      "Content-Type": "application/json",
      "authorization": `Bearer ${token}`,
    });

    const response = await fetch(url, { method, headers, body });
    if (!response.ok) {
      throw new Error("Failed to update variable binding");
    }

    const responseJson = await response.json();

    return responseJson;
  }
);

export const createVariableBinding = createAsyncThunk(
  "dataset/createVariableBinding",
  async ({ team_id, dataset_id, dataRequest_id, data }) => {
    const token = getAuthToken();
    const url = `${API_HOST}/team/${team_id}/datasets/${dataset_id}/dataRequests/${dataRequest_id}/variableBindings`;
    const method = "POST";
    const body = JSON.stringify(data);
    const headers = new Headers({
      "Accept": "application/json",
      "Content-Type": "application/json",
      "authorization": `Bearer ${token}`,
    });

    const response = await fetch(url, { method, headers, body });
    if (!response.ok) {
      throw new Error("Failed to create variable binding");
    }

    const responseJson = await response.json();

    // returns the new dataRequest object with the new variable bindings
    return responseJson;
  }
);
  
export const updateVariableBinding = createAsyncThunk(
  "dataset/updateVariableBinding",
  async ({ team_id, dataset_id, dataRequest_id, variable_id, data }) => {
    const token = getAuthToken();
    const url = `${API_HOST}/team/${team_id}/datasets/${dataset_id}/dataRequests/${dataRequest_id}/variableBindings/${variable_id}`;
    const method = "PUT";
    const body = JSON.stringify(data);
    const headers = new Headers({
      "Accept": "application/json",
      "Content-Type": "application/json",
      "authorization": `Bearer ${token}`,
    });

    const response = await fetch(url, { method, headers, body });
    if (!response.ok) {
      throw new Error("Failed to update variable binding");
    }

    const responseJson = await response.json();

    // returns the new dataRequest object with the new variable bindings
    return responseJson;
  }
);

export const datasetSlice = createSlice({
  name: "dataset",
  initialState,
  reducers: {
    clearDatasets: (state) => {
      state.data = [];
      state.responses = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // getDatasets
      .addCase(getDatasets.pending, (state) => {
        state.loading = true;
      })
      .addCase(getDatasets.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getDatasets.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })

      // getDataset
      .addCase(getDataset.pending, (state) => {
        state.loading = true;
      })
      .addCase(getDataset.fulfilled, (state, action) => {
        state.loading = false;
        if (state.data.find((dataset) => dataset.id === action.payload.id)) {
          state.data = state.data.map((dataset) =>
            dataset.id === action.payload.id ? action.payload : dataset
          );
        }
        else {
          state.data.push(action.payload);
        }
      })
      .addCase(getDataset.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })

      // saveNewDataset
      .addCase(saveNewDataset.pending, (state) => {
        state.loading = true;
      })
      .addCase(saveNewDataset.fulfilled, (state, action) => {
        state.loading = false;
        if (state.data.find((dataset) => dataset.id === action.payload.id)) {
          state.data = state.data.map((dataset) =>
            dataset.id === action.payload.id ? action.payload : dataset
          );
        }
        else {
          state.data.push(action.payload);
        }
      })
      .addCase(saveNewDataset.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })

      // updateDataset
      .addCase(updateDataset.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateDataset.fulfilled, (state, action) => {
        state.loading = false;
        if (state.data.find((dataset) => dataset.id === action.payload.id)) {
          state.data = state.data.map((dataset) =>
            dataset.id === action.payload.id ? {
              ...dataset,
              ...action.payload,
              DataRequests: action.payload.DataRequests?.map((newDr) => {
                const existingDr = dataset.DataRequests?.find(dr => dr.id === newDr.id);
                return {
                  ...newDr,
                  response: existingDr?.response || newDr.response
                };
              })
            } : dataset
          );
        }
        else {
          state.data.push(action.payload);
        }
      })
      .addCase(updateDataset.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })

      // deleteDataset
      .addCase(deleteDataset.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteDataset.fulfilled, (state, action) => {
        state.loading = false;
        state.data = state.data.filter((dataset) => dataset.id !== action.meta.arg.dataset_id);
      })
      .addCase(deleteDataset.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })

      // runRequest
      .addCase(runRequest.pending, (state) => {
        state.loading = true;
      })
      .addCase(runRequest.fulfilled, (state, action) => {
        const datasetId = parseInt(action.meta.arg.dataset_id, 10);
        const indexReq = state.responses.findIndex(
          (response) => response.dataset_id === datasetId
        );

        if (indexReq > -1) {
          state.responses[indexReq] = {
            ...state.responses[indexReq],
            data: action.payload.data,
            dataset_id: datasetId,
          };
        } else {
          state.responses.push({
            data: action.payload.data,
            dataset_id: datasetId,
          });
        }

        state.loading = false;
      })
      .addCase(runRequest.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })

      // getDataRequestsByDataset
      .addCase(getDataRequestsByDataset.pending, (state) => {
        state.loading = true;
      })
      .addCase(getDataRequestsByDataset.fulfilled, (state, action) => {
        state.loading = false;
        state.data = state.data.map((dataset) => {
          if (dataset.id === action.meta.arg.dataset_id) {
            return {
              ...dataset,
              DataRequests: action.payload,
            };
          }
          return dataset;
        });
      })
      .addCase(getDataRequestsByDataset.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })

      // createDataRequest
      .addCase(createDataRequest.pending, (state) => {
        state.loading = true;
      })
      .addCase(createDataRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.data = state.data.map((dataset) => {
          if (dataset.id === action.meta.arg.dataset_id) {
            return {
              ...dataset,
              DataRequests: [
                ...dataset.DataRequests,
                action.payload,
              ],
            };
          }
          return dataset;
        });
      })
      .addCase(createDataRequest.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })

      // updateDataRequest
      .addCase(updateDataRequest.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateDataRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.data = state.data.map((dataset) => {
          if (dataset.id === action.meta.arg.dataset_id) {
            return {
              ...dataset,
              DataRequests: dataset.DataRequests.map((dataRequest) => {
                if (dataRequest.id === action.meta.arg.dataRequest_id) {
                  return action.payload;
                }
                return dataRequest;
              }),
            };
          }
          return dataset;
        });
      })
      .addCase(updateDataRequest.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })

      // deleteDataRequest
      .addCase(deleteDataRequest.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteDataRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.data = state.data.map((dataset) => {
          if (dataset.id === action.meta.arg.dataset_id) {
            return {
              ...dataset,
              DataRequests: dataset.DataRequests.filter(
                (dataRequest) => dataRequest.id !== action.meta.arg.dataRequest_id
              ),
            };
          }
          return dataset;
        });
      })
      .addCase(deleteDataRequest.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })

      // runDataRequest
      .addCase(runDataRequest.pending, (state, action) => {
        state.loading = true;
        state.data = state.data.map((dataset) => {
          if (dataset.id === action.meta.arg.dataset_id) {
            return {
              ...dataset,
              DataRequests: dataset.DataRequests.map((dataRequest) => {
                if (dataRequest.id === action.meta.arg.dataRequest_id) {
                  return {
                    ...dataRequest,
                    loading: true,
                    error: false,
                  };
                }
                return dataRequest;
              }),
            };
          }
          return dataset;
        });
      })
      .addCase(runDataRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.data = state.data.map((dataset) => {
          if (dataset.id === parseInt(action.meta.arg.dataset_id, 10) && dataset.DataRequests) {
            return {
              ...dataset,
              DataRequests: dataset.DataRequests.map((dataRequest) => {
                if (dataRequest.id === parseInt(action.meta.arg.dataRequest_id, 10)) {
                  let newDr = {
                    ...dataRequest,
                    loading: false,
                    response: action.payload.response?.dataRequest?.responseData?.data,
                    error: false,
                  };

                  if (action.payload?.response?.status?.statusCode >= 300) {
                    newDr = {
                      ...newDr,
                      error: true,
                      response: action.payload.response,
                    };
                  }

                  if (action.payload?.response?.dataRequest?.dataRequest) {
                    newDr = {
                      ...newDr,
                      ...action.payload.response.dataRequest.dataRequest,
                    }; 
                  }

                  return newDr;
                }
                return dataRequest;
              }),
            };
          }
          return dataset;
        });
      })
      .addCase(runDataRequest.rejected, (state, action) => {
        state.loading = false;
        state.data = state.data.map((dataset) => {
          if (dataset.id === action.meta.arg.dataset_id) {
            return {
              ...dataset,
              DataRequests: dataset.DataRequests.map((dataRequest) => {
                if (dataRequest.id === action.meta.arg.dataRequest_id) {
                  return {
                    ...dataRequest,
                    loading: false,
                    error: action.payload.status,
                  };
                }
                return dataRequest;
              }),
            };
          }
          return dataset;
        });
      })

      // duplicateDataset
      .addCase(duplicateDataset.pending, (state) => {
        state.loading = true;
      })
      .addCase(duplicateDataset.fulfilled, (state, action) => {
        state.loading = false;
        state.data = [action.payload, ...state.data];
      })
      .addCase(duplicateDataset.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })

      // createDatasetVariableBinding
      .addCase(createDatasetVariableBinding.pending, (state) => {
        state.loading = true;
      })
      .addCase(createDatasetVariableBinding.fulfilled, (state, action) => {
        state.loading = false;
        state.data = state.data.map((dataset) => {
          if (dataset.id === action.meta.arg.dataset_id) {
            return {
              ...dataset,
              VariableBindings: [...dataset.VariableBindings, action.payload],
            };
          }
          return dataset;
        });
      })
      .addCase(createDatasetVariableBinding.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })

      // updateDatasetVariableBinding
      .addCase(updateDatasetVariableBinding.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateDatasetVariableBinding.fulfilled, (state, action) => {
        state.loading = false;
        state.data = state.data.map((dataset) => {
          if (dataset.id === action.meta.arg.dataset_id) {
            return {
              ...dataset,
              VariableBindings: dataset.VariableBindings.map((variableBinding) => {
                if (variableBinding.id === action.meta.arg.variable_id) {
                  return action.payload;
                }
                return variableBinding;
              }),
            };
          }
          return dataset;
        });
      })
      .addCase(updateDatasetVariableBinding.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })

      // createVariableBinding
      .addCase(createVariableBinding.pending, (state) => {
        state.loading = true;
      })
      .addCase(createVariableBinding.fulfilled, (state, action) => {
        state.loading = false;
        state.data = state.data.map((dataset) => {
          if (dataset.id === action.meta.arg.dataset_id) {
            return {
              ...dataset,
              DataRequests: dataset.DataRequests.map((dataRequest) => {
                if (dataRequest.id === action.meta.arg.dataRequest_id) {
                  return action.payload;
                }
                return dataRequest;
              }),
            };
          }
          return dataset;
        });
      })
      .addCase(createVariableBinding.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })

      // updateVariableBinding
      .addCase(updateVariableBinding.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateVariableBinding.fulfilled, (state, action) => {
        state.loading = false;
        state.data = state.data.map((dataset) => {
          if (dataset.id === action.meta.arg.dataset_id) {
            return {
              ...dataset,
              DataRequests: dataset.DataRequests.map((dataRequest) => {
                if (dataRequest.id === action.meta.arg.dataRequest_id) {
                  return action.payload;
                }
                return dataRequest;
              }),
            };
          }
          return dataset;
        });
      })
      .addCase(updateVariableBinding.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  }
});

export const { clearDatasets } = datasetSlice.actions;

export const selectDatasets = (state) => state.dataset.data;
export const selectDatasetsNoDrafts = (state) => state.dataset.data.filter((dataset) => !dataset.draft);
export const selectResponses = (state) => state.dataset.responses;
export const selectDataRequests = (state, datasetId) => {
  const dataset = state.dataset.data.find((dataset) => dataset.id === parseInt(datasetId, 10));
  if (dataset) {
    return dataset.DataRequests;
  }
  return [];
}

export const selectDataRequest = (state, datasetId, drId) => {
  const dataset = state.dataset.data.find((dataset) => dataset.id === parseInt(datasetId, 10));
  if (dataset) {
    const dr = dataset.DataRequests.find((dr) => dr.id === parseInt(drId, 10));
    if (dr) {
      return dr;
    }
  }
  return {};
}

export default datasetSlice.reducer;
