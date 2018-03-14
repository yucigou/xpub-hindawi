import request, { remove, get } from 'pubsweet-client/src/helpers/api'

const initialState = {
  isFetching: {
    manuscripts: false,
    supplementary: false,
    coverLetter: false,
  },
  error: null,
}
// constants
const UPLOAD_REQUEST = 'files/UPLOAD_REQUEST'
const UPLOAD_FAILURE = 'files/UPLOAD_FAILURE'
const UPLOAD_SUCCESS = 'files/UPLOAD_SUCCESS'

const REMOVE_REQUEST = 'files/REMOVE_REQUEST'
const REMOVE_FAILURE = 'files/REMOVE_FAILURE'
const REMOVE_SUCCESS = 'files/REMOVE_SUCCESS'

// action creators
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
  data.append('fragmentId', fragmentId)
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

const removeSuccess = file => ({
  type: REMOVE_SUCCESS,
  file,
})

// selectors
export const getRequestStatus = state => state.files.isFetching
export const getFileError = state => state.files.error

// thunked actions
export const uploadFile = (file, type, fragmentId) => dispatch => {
  dispatch(uploadRequest(type))
  return request('/files', createFileData(file, type, fragmentId)).then(
    r => {
      dispatch(uploadSuccess())
      return r
    },
    error => {
      dispatch(uploadFailure(error))
      throw error
    },
  )
}

export const deleteFile = fileId => dispatch => {
  dispatch(removeRequest())
  return remove(`/files/${fileId}`)
    .then(r => {
      dispatch(removeSuccess())
      return r
    })
    .catch(err => dispatch(removeFailure(err.message)))
}

export const getSignedUrl = fileId => dispatch => get(`/file/${fileId}`)

// reducer
export default (state = initialState, action) => {
  switch (action.type) {
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
