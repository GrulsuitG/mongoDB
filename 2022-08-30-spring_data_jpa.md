# Spring Data JPA

사진

안녕하세요 Spring framework에서 JPA를 보다 편리하게 사용할수 있도록 도와주는 Spring Data JPA를 소개해보려고 합니다.

# Spring Data JPA 란?

JPA를 보다 쉽게 사용할 수있도록 지원해주는 Framewrok  
→ data access layer를 구현하기 위한 boilerplate code 를 줄이는 것이 목표입니다.

# How to?

```java
public interface CrudRepository<T, ID> extends Repository<T, ID> {

  <S extends T> S save(S entity);

  Optional<T> findById(ID primaryKey);

  Iterable<T> findAll();

  void delete(T entity);

  // … more functionality omitted.
}
```

## 특징

- Interface 로 Repository 구현.
- Repository<T, ID>  
  T : 저장할 Entity  
  ID : entity 의 primary key
- CRUD
  save : entitiy 저장  
  findById : id(pk) 로 entity 조회  
  findAll : 모든 entity 조회  
  delete : Entity 삭제  
  Update 는 변경감지로 이루어집니다.

## 메소드 이름으로 쿼리 생성

find…By[condition], read…By[condition], delete…By[condition] 등과 같이 method를 만들면 자동으로 쿼리가 생성됩니다.

```java
interface PersonRepository extends Repository<Person, Long> {
  List<Person> findByLastname(String lastname);

	/*
	-> 다음과 같은 JPQL이 만들어집니다.
	"select p from Person p where p.Lastname= :lastname"
	-> 다음과 같은 SQL이 만들어집니다.
	"SELECT *
	 FROM person
	 WHERE person.lastname = ?"
	*/
}
```

…에는 알기 쉽도록 이름을 넣어주면 되고 [condition] 에는 원하는 조건을 넣어주면 됩니다.

Docs : [https://docs.spring.io/spring-data/jpa/docs/current/reference/html/#repository-query-keywords](https://docs.spring.io/spring-data/jpa/docs/current/reference/html/#repository-query-keywords)

## @Query 를 이용한 쿼리 정의

메소드에 JPQL 쿼리를 작성 가능합니다.

```java
public interface UserRepository extends JpaRepository<User, Long> {
  @Query("select u from User u where u.emailAddress = ?1")
  User findByEmailAddress(String emailAddress);
}
```

JPA 만 이용하면 메소드에 @Query 어노테이션을 붙이는 것이 불가능하지만  
Spring Data JPA 는 메소드에 직접 @Query 어노테이션을 붙여 Named Query 가 가능하게 해주어 직관적으로 이해할 수 있도록 도와줍니다.

## 페이징 과 정렬

Pageble 과 Sort class 를 이용해 처리가 가능합니다.

```java
Page<User> findByLastname(String lastname, Pageable pageable);

Slice<User> findByLastname(String lastname, Pageable pageable);

List<User> findByLastname(String lastname, Sort sort);

List<User> findByLastname(String lastname, Pageable pageable);
```

Page : 추가 count 쿼리 결과를 포함하는 페이징

Slice : 추가 count 쿼리 없이 다음 페이지만 확인.

```java
PageRequest pageRequest = new PageRequest(0, 10, new Sort(Direction.DESC, "name"));
														//현재 페이지, 조회 데이터 수, 정렬 정보
```

Pageble의 구현체로 PageRequest 를 사용.

## 사용자 정의 리포지토리 구현

QueryDsl 을 이용 혹은 인터페이스의 메서드를 직접 구현하고 싶다면 다음과 같은 절차를 따르면 됩니다.

1. 사용자 정의 인터페이스 만들기

   ```java
   interface CustomizedUserRepository {
     void someCustomMethod(User user);
   }
   ```

2. 인터페이스 구현하기

   ```java
   class CustomizedUserRepositoryImpl implements CustomizedUserRepository {
     public void someCustomMethod(User user) {
       // Your custom implementation
     }
   }
   ```

   이름 : 사용자정의인터페이스 + Impl  
   → Spring Data 에서 인식해서 Spring bean으로 인식해서 등록하여 줍니다.  
   Postfix는 설정을 통해 변경 가능

3. 사용자 정의 인터페이스 상속

   ```java
   interface UserRepository extends CrudRepository<User, Long>, CustomizedUserRepository {
     // Declare query methods here
   }
   ```

   여러 사용자 정의 인터페이스를 상속하는 것도 가능합니다.

## ETC.

### @PrePsersist

새로운 엔티티에 대해 persist가 호출되기 전 수행되는 함수.

### @PreUpdate

엔티티가 변경감지 혹은 병합으로 업데이트 되기 전 동작

### @Modifying

값을 변경하는 쿼리(update, delete, insert)에 붙여줘야 동작.  
Spring Data JPA가 생성해주는 메소드에는 붙여줄 필요 X  
→ @Query 가 있는 메소드에 붙어주어야 합니다.

# 마치며

복잡한 SQL과 설정, 단순한 CRUD 생성을 획기적으로 줄여주는 Spring Data JPA를 이용해보시는 건 어떨까요?

# Reference

- [https://docs.spring.io/spring-data/jpa/docs/current/reference/html/#preface](https://docs.spring.io/spring-data/jpa/docs/current/reference/html/#preface)
