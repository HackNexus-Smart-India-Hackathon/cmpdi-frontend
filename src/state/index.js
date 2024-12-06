import { createSlice } from '@reduxjs/toolkit';

const initialAuthState = {
  role: null,
  user_id: null,
  access_token: null,
};

const initialProjectState = {
  projectId: null,
  projectCode: null,
  projectTitle: null,
  fundingSource: null,
  principalImplementingAgency: null,
  subImplementingAgencies: [],
  projectInvestigatorEmail: [],
  startDate: null,
  scheduleCompletionDate: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    setLogin: (state, action) => {
      state.user_id = action.payload.user_id;
      state.access_token = action.payload.access_token;
      state.role = action.payload.role;
    },
    setLogout: (state) => {
      state.user_id = null;
      state.access_token = null;
      state.role = null;
    },
  },
});

export const projectSlice = createSlice({
  name: 'project',
  initialState: initialProjectState,
  reducers: {
    setProject: (state, action) => {
      state.projectId = action.payload.projectId;
      state.projectCode = action.payload.projectCode;
      state.projectTitle = action.payload.projectTitle;
      state.fundingSource = action.payload.fundingSource;
      state.principalImplementingAgency =
        action.payload.principalImplementingAgency;
      state.subImplementingAgencies = action.payload.subImplementingAgencies;
      state.projectInvestigatorEmail = action.payload.projectInvestigatorEmail;
      state.startDate = action.payload.startDate;
      state.scheduleCompletionDate = action.payload.scheduleCompletionDate;
    },
  },
});

export const { setLogin, setLogout } = authSlice.actions;
export const { setProject } = projectSlice.actions;

const reducers = { auth: authSlice.reducer, project: projectSlice.reducer };
export { reducers };
