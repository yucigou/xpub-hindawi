import request from 'pubsweet-client/src/helpers/api'

const initialState = {
  isFetching: false,
  error: null,
  files: {
    manuscripts: [],
    supplementary: [],
    coverLetter: [],
  },
}

const UPLOAD_REQUEST = 'files/UPLOAD_REQUEST'
const UPLOAD_FAILURE = 'files/UPLOAD_FAILURE'
const UPLOAD_SUCCESS = 'files/UPLOAD_SUCCESS'

const SET_FILES = 'files/SET_FILES'

export const setFiles = (files, fileType) => ({
  type: SET_FILES,
  files,
  fileType,
})

const uploadRequest = () => ({
  type: UPLOAD_REQUEST,
})

const uploadFailure = error => ({
  type: UPLOAD_FAILURE,
  error,
})

const uploadSuccess = () => ({
  type: UPLOAD_SUCCESS,
})

const createFileData = file => {
  const data = new FormData()
  data.append('file', file)

  return {
    method: 'POST',
    headers: {
      Accept: 'text/plain',
    },
    body: data,
  }
}

export const getFiles = state => state.files.files

export const uploadFile = file => dispatch => {
  dispatch(uploadRequest())
  return request('/aws-upload', createFileData(file))
    .then(r => {
      dispatch(uploadSuccess())
      return r
    })
    .catch(err => dispatch(uploadFailure(err.message)))
}

export default (state = initialState, action) => {
  switch (action.type) {
    case UPLOAD_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: null,
      }
    case SET_FILES:
      return {
        ...state,
        files: {
          ...state.files,
          [action.fileType]: action.files,
        },
      }
    case UPLOAD_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      }
    case UPLOAD_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: null,
      }
    default:
      return state
  }
}
