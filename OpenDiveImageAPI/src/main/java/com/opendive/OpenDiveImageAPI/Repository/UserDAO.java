package com.opendive.OpenDiveImageAPI.Repository;

import com.opendive.OpenDiveImageAPI.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;



public interface UserDAO extends JpaRepository<User,Long>{

    User findByName(String name);

}
