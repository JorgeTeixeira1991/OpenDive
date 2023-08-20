package com.ImageDbApi.ImageApi.Repository;

import com.ImageDbApi.ImageApi.Models.Image;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImageRepository extends JpaRepository<Image, Long> {}
