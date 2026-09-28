package com.globalnex.repository;

import com.globalnex.model.Service;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ServiceRepository extends MongoRepository<Service, String> {
    Optional<Service> findBySlug(String slug);
    List<Service> findAllByOrderByOrderAsc();
    List<Service> findByIsFeaturedOnHomeTrueOrderByOrderAsc();
    boolean existsBySlug(String slug);
}
