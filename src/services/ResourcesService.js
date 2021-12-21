import axios from "axios";
import authorizationHeader from "./AuthorizationHeader";

const RESOURCE_API_BASE_URL = "https://spring-boot-security-backend.herokuapp.com/api/v1/resources";

class ResourcesService {
  getAllResources(params) {
    return axios.get(RESOURCE_API_BASE_URL + "/all_data", {
      params,
      headers: authorizationHeader(),
    });
  }

  getResourceId(resourceId) {
    return axios.get(RESOURCE_API_BASE_URL + "/all_data/" + resourceId, {
      headers: authorizationHeader(),
    });
  }

  createNewResource(newResource) {
    return axios.post(RESOURCE_API_BASE_URL + "/post_data", newResource, {
      headers: authorizationHeader(),
    });
  }

  updateResource(oldResource, newResourceId) {
    return axios.put(
      RESOURCE_API_BASE_URL + "/update_data/" + newResourceId,
      oldResource,
      {
        headers: authorizationHeader(),
      }
    );
  }

  deleteResource(resourceId) {
    return axios.delete(RESOURCE_API_BASE_URL + "/delete_data/" + resourceId, {
      headers: authorizationHeader(),
    });
  }
}

export default new ResourcesService();
