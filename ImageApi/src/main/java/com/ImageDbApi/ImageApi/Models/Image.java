package com.ImageDbApi.ImageApi.Models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;

@Entity
public class Image {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Lob
  @Column(columnDefinition = "LONGBLOB")
  private byte[] data;

  @Column
  private String description;

  public void setData(byte[] bytes) {
    this.data = bytes;
  }

  public void setDescription(String description2) {
    this.description = description2;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public byte[] getData() {
    return data;
  }

  public String getDescription() {
    return description;
  }

}
