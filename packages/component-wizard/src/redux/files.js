import request, { remove, get } from 'pubsweet-client/src/helpers/api'
import { change as changeForm } from 'redux-form'

const initialState = {
  isFetching: {
    manuscripts: false,
    supplementary: false,
    coverLetter: false,
  },
  error: null,
  files: {
    manuscripts: [],
    supplementary: [],
    coverLetter: [],
  },
}
// constants
const UPLOAD_REQUEST = 'files/UPLOAD_REQUEST'
const UPLOAD_FAILURE = 'files/UPLOAD_FAILURE'
const UPLOAD_SUCCESS = 'files/UPLOAD_SUCCESS'

const REMOVE_REQUEST = 'files/REMOVE_REQUEST'
const REMOVE_FAILURE = 'files/REMOVE_FAILURE'
const REMOVE_SUCCESS = 'files/REMOVE_SUCCESS'

const SET_ALL_FILES = 'files/SET_ALL_FILES'

// action creators
const _setAllFiles = files => ({
  type: SET_ALL_FILES,
  files,
})

export const setAllFiles = files => dispatch => {
  dispatch(changeForm('wizard', 'files', files))
  dispatch(_setAllFiles(files))
}

export const moveFiles = files => dispatch => {
  dispatch(_setAllFiles(files))
}

const uploadRequest = type => ({
  type: UPLOAD_REQUEST,
  fileType: type,
})

const uploadFailure = error => ({
  type: UPLOAD_FAILURE,
  error,
})

const uploadSuccess = () => ({
  type: UPLOAD_SUCCESS,
})

const createFileData = (file, type, fragmentId) => {
  const data = new FormData()
  data.append('fileType', type)
  data.append('framentId', fragmentId)
  data.append('file', file)

  return {
    method: 'POST',
    headers: {
      Accept: 'text/plain',
    },
    body: data,
  }
}

const removeRequest = () => ({
  type: REMOVE_REQUEST,
})

const removeFailure = error => ({
  type: REMOVE_FAILURE,
  error,
})

const removeSuccess = () => ({
  type: REMOVE_SUCCESS,
})

// selectors
export const getFiles = state => state.files.files
export const getRequestStatus = state => state.files.isFetching

// thunked actions
export const uploadFile = (file, type, fragmentId) => dispatch => {
  dispatch(uploadRequest(type))
  return request('/aws-upload', createFileData(file, type, fragmentId))
    .then(r => {
      dispatch(uploadSuccess())
      return r
    })
    .catch(err => dispatch(uploadFailure(err.message)))
}

export const deleteFile = (fileId, fragmentId) => dispatch => {
  dispatch(removeRequest())
  return remove(`/aws-delete/${fragmentId}/${fileId}`)
    .then(r => {
      dispatch(removeSuccess())
      return r
    })
    .catch(err => dispatch(removeFailure(err.message)))
}

export const getSignedUrl = (fileId, fragmentId) =>
  get(`aws-signed-url/${fragmentId}/${fileId}`)

// reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ALL_FILES:
      return {
        ...state,
        files: action.files,
      }
    case UPLOAD_REQUEST:
      return {
        ...state,
        error: null,
        isFetching: {
          ...state.isFetching,
          [action.fileType]: true,
        },
      }
    case UPLOAD_FAILURE:
      return {
        ...state,
        isFetching: initialState.isFetching,
        error: action.error,
      }
    case UPLOAD_SUCCESS:
      return {
        ...state,
        isFetching: initialState.isFetching,
        error: null,
      }
    default:
      return state
  }
}
