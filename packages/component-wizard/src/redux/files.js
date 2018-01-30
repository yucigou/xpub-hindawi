import request, { remove } from 'pubsweet-client/src/helpers/api'

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

const REMOVE_REQUEST = 'files/REMOVE_REQUEST'
const REMOVE_FAILURE = 'files/REMOVE_FAILURE'
const REMOVE_SUCCESS = 'files/REMOVE_SUCCESS'

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

const createFileData = (file, type) => {
  const data = new FormData()
  data.append('file', file)
  data.append('fileType', type)

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

export const getFiles = state => state.files.files

export const uploadFile = (file, type) => dispatch => {
  dispatch(uploadRequest())
  return request('/aws-upload', createFileData(file, type))
    .then(r => {
      dispatch(uploadSuccess())
      return r
    })
    .catch(err => dispatch(uploadFailure(err.message)))
}

export const deleteFile = fileId => dispatch => {
  dispatch(removeRequest())
  return remove(`/aws-delete/${fileId}`)
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
