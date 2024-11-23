package dz.khaled.benkadour.crud.repository;

import dz.khaled.benkadour.crud.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
}
