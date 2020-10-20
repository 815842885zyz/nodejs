import {fetch} from './fetch'
import api from './url';


export const getServer = () => fetch ({
  url: api.integra + "/server",
  method: 'get'
})
