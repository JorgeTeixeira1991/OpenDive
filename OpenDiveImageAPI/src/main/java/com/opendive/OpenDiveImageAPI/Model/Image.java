package com.opendive.OpenDiveImageAPI.Model;

import jakarta.persistence.*;
import lombok.Data;

import java.sql.Blob;


@Entity
@Table
@Data
public class Image{
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        long id;
        @Column
        String name;
        @Lob @Column
        Blob content;
}

