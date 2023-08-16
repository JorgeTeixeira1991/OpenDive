package com.opendive.OpenDiveImageAPI.Service.User;

import com.opendive.OpenDiveImageAPI.Model.User;
import com.opendive.OpenDiveImageAPI.Repository.UserDAO;
import com.opendive.OpenDiveImageAPI.Service.User.UserService;

public class UserServiceImpl implements UserService {

    private UserDAO userDAO;


    public User getUser(Long id){
        return userDAO.findById(id).orElseThrow(RuntimeException::new);
    }


}
