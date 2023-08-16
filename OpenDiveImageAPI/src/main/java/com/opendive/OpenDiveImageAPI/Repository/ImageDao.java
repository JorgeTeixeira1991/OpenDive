package com.opendive.OpenDiveImageAPI.Repository;

import com.opendive.OpenDiveImageAPI.Model.Image;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImageDao extends JpaRepository<Image, Long> {

}
