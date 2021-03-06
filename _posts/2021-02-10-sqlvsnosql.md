---
layout: post
title: "🧐 SQL과 NoSQL에 대해서 짧은 끄적임"
subtitle: "SQL vs NoSQL (번역에 가까운 블로깅)"
date: 2021-02-10
background: "/img/posts/post-dev.png"
tags: [backend, database]
---

`목차` <br />

- [SQL](#SQL)
- [NoSQL](#NoSQL)
- [SQL과 NoSQL의 차이점](#SQL과-NoSQL의-차이점)
- [SQL과 NoSQL 중에서 어떤 것을 사용해야 하나요?](#SQL과-NoSQL-중에서-어떤-것을-사용해야-하나요?)

<p style="display: block; margin-top: 0px; margin-bottom: 32px" > </p>

데이터베이스는 크게 **관계형 데이터베이스**와 **비관계형 데이터베이스**로 양분된다. 관계형 데이터베이스는 **SQL**을 기반으로 하고 비관계형 데이터베이스는 **NoSQL**로 데이터를 다룬다. SQL과 NoSQL은 만들어진 방식, 저장하는 정보의 종류, 그리고 저장하는 방법 등에 차이가 있다. <br />

관계형 데이터베이스는 구조화 되어있는 데이터베이스를 의미한다. 전화번호와 주소, 이름이 같이 적혀있는 전화번호부와 비슷한 *구조화된 스키마*를 미리 작성해야한다. 이와 반대로, 비관계형 데이터베이는 구조화되지 않고, 분산되어있다. 컴퓨터에 생성한 하나의 폴더에 여러 사람의 주소나 전화번호, 쇼핑몰 주소등을 모두 담을 수 있는 형식과 비슷하다고 생각하면 편하다.

<p style="display: block; margin-top: 0px; margin-bottom: 32px" > </p>

## SQL

관계형 데이터베이스는 행(row)과 열(column)로 구성된 테이블에 데이터를 저장한다. 각각의 행은 하나의 속성에 대한 정보를 저장하고, 열에는 각각의 데이터 형식에 맞는 데이터가 저장된다. 관계형 데이터베이스에 저장되어 관리되는 데이터는 SQL이라고 하는 구조화된 쿼리 언어로 **생성(Create), 조회(Read), 갱신(Update), 삭제(Delete)**의 행동을 진행한다. 대표적인 관계형 데이터베이스에는 *MySQL, Oracle, SQLite, Postgres, MariaDB*가 있다.

<p style="display: block; margin-top: 0px; margin-bottom: 25px" > </p>

## NoSQL

NoSQL 기반의 비관계형 데이터베이스는 보통 다음과 같은 타입으로 구성된다.

- **Key-Value 타입** : 데이터를 `Key-Value`의 쌍을 속성으로 하는 배열 형태로 저장한다. 여기서 **Key**는 속성 이름을 뜻하고, **Value**는 속성에 연결된 데이터 값을 의미한다. _Redis, Dynamo_ 등이 대표적인 Key-Value 형식의 데이터베이스다.

- **문서형(Document) 데이터베이스** : 데이터를 테이블이 아닌 문서처럼 저장하는 데이터베이스를 의미한다. JSON 유사 형식으로 데이터를 문서화한다. 각각의 문서는 하나의 속성에 대한 데이터를 가지고 컬렉션이라고 하는 그룹으로 묶어서 관리한다. 대표적인 문서형 데이터베이스에는 *MongoDB*가 있다.

- **Wide-Column 데이터베이스** : 데이터베이스의 열(column)에 대한 데이터 관리를 집중하는 데이터베이스다. 각 열에는 key-value 형식으로 데이터가 저장되고, 컬럼 패밀리(column families)라고 하는 열의 집합체 단위로 데이터를 처리할 수 있다. 하나의 행에 많은 열을 포함할 수 있다는 유연성이 있다. 데이터 처리에 필요한 열을 유연하게 선택할 수 있다는 점에서 큰 규모의 데이터 분석에 주로 사용되는 데이터베이스 형식이다. 대표적인 wide-column 데이터베이스에는 *Cassandra, HBase*가 있다.

- **그래프(Graph) 데이터베이스** : 자료구조의 그래프와 비슷한 형식으로 데이터 간의 관계를 구성하는 데이터베이스다. 데이터는 노드(nodes)에 속성별(entities)로 저장된다. 각 노드간의 관계는 선(edge)으로 연결된다. 대표적인 그래프 데이터베이스에는 *Neo4J, InfiniteGraph*가 있다.

<p style="display: block; margin-top: 0px; margin-bottom: 32px" > </p>

## SQL과 NoSQL의 차이점

**데이터 저장(Storage)**

- 관계형 데이터베이스는 SQL을 이용해서 데이터를 테이블에 저장한다. 스키마를 기반으로 정해진 형식에 맞게 데이터를 저장한다.
- NoSQL은 이와는 사뭇 다른 형태로 데이터를 저장한다. 위에서 설명된 것처럼, key-value, document, graph, wide-column 형식등으로 다양하게 데이터를 저장한다.

<p style="display: block; margin-top: 0px; margin-bottom: 20px" > </p>

**스키마(Schema)**

- SQL을 사용하려면 형식이 고정된 스키마가 필요하다. 처리하려는 데이터 속성별로 열에 대한 정보가 미리 정해져야 한다는 의미다. 스키마는 나중에 변경할 수 있지만, 그럴 경우 전체 데이터베이스를 수정하거나 오프라인으로 전환할 필요가 있다.
- NoSQL은 동적인 스키마를 기반할 수 있다. NoSQL로 즉시 열을 추가할 수 있고, 개별 속성에 대해서 모든 열에 대한 데이터를 반드시 입력하지 않아도 된다.

<p style="display: block; margin-top: 0px; margin-bottom: 20px" > </p>

**쿼리(Querying)**

- 쿼리는 데이터베이스에 대해서 정보를 요청하는 행동을 의미한다. 관계형 데이터베이스는 테이블의 형식과 테이블간의 관계에 맞춰서 데이터를 요청한다. 그래서 SQL과 같은 구조화된 쿼리 언어를 사용하는 것이다.
- 비관계형 데이터베이스의 쿼리는 데이터 그룹 자체를 조회하는 것에 초점을 둔다. 그래서 구조화 되지 않은 쿼리 언어로도 데이터 요청이 가능하다. UnQL(UnStructured Query Language)을 사용한다고도 한다.

<p style="display: block; margin-top: 0px; margin-bottom: 20px" > </p>

**확장성(Scalability)**

- SQL 기반의 관계형 데이터베이스는 보통 수직적으로 확장한다. 데이터베이스가 구축된 하드웨어의 성능을 많이 이용하기 때문에 고비용이 든다. 복수의 서버에 걸쳐서 데이터베이스의 관계를 정의할 수 있지만 매우 복잡하고 시간이 많이 소모된다.
- NoSQL로 구성된 데이터베이스는 수평적으로 확장된다. 많은 트래픽을 처리할 수 있도록 NoSQL 데이터베이스를 위한 서버를 추가적으로 구축할 수 있다는 의미다. 또한 저렴한 범용 하드웨어에 구축하거나 클라우드 기반의 인스턴스에 NoSQL 데이터베이스를 호스팅할 수 있어서 수직적 확장보다 비용 효율성이 높다.

<p style="display: block; margin-top: 0px; margin-bottom: 32px" > </p>

## SQL과 NoSQL 중에서 어떤 것을 사용해야 하나요?

데이터베이스를 구축하는 방법을 선택하는 것에 완벽한 솔루션은 없다. 그렇기 때문에 많은 개발자들은 서비스에 맞고 유저의 요구를 충족하기 위해 관계형, 비관계형 데이터베이스를 모두 사용한다. NoSQL 기반의 비관계형 데이터베이스가 확장성이나 속도에서 뛰어나다고 해도 고차원으로 구조화된 SQL 기반의 데이터베이스가 더 좋은 성능을 보여주기도 한다. 여러 사용 사례를 살펴보고 적절한 데이터베이스를 선택하는 것이 중요하다.

<p style="display: block; margin-top: 0px; margin-bottom: 25px" > </p>

### SQL 기반의 관계형 데이터베이스를 사용하는 케이스

**데이터베이스의 ACID 성질을 준수해야 하는 경우** <br />

ACID는 Atomicity, Consistency, Isolation, Durability 를 가리킨다. 각 단어는 데이터베이스 내에서 일어나는 하나의 상태 변화 수행(transaction)에 안전성을 보장하기 위해 필요한 성질이다. SQL을 사용하여 데이터베이스와 상호 작용하는 방식을 정확하게 규정할 수 있기 때문에 이상 징후를 줄이고, 데이터베이스의 무결성을 보호할 수 있다. <br />

전자 상거래, 금융 서비스를 위한 소프트웨어 개발에서는 데이터베이스의 ACID 성질을 잘 준수해주는 것이 필수 옵션으로 되어있기 때문에 SQL을 이용한 관계형 데이터베이스를 사용한다. <br />

<p style="display: block; margin-top: 0px; margin-bottom: 20px" > </p>

**소프트웨어에 사용되는 데이터가 구조적이고 일관적인 경우** <br />

소프트웨어(프로젝트)의 규모가 많은 서버를 필요로 하지 않고, 일관된 데이터를 사용하는 경우, 보통 관계형 데이터베이스를 사용한다. 이런 경우 다양한 데이터 유형과 높은 트래픽을 지원하도록 설계된 NoSQL 데이터베이스를 굳이 사용할 이유가 없다.

<p style="display: block; margin-top: 0px; margin-bottom: 25px" > </p>

### NoSQL 기반의 비관계형 데이터베이스를 사용하는 케이스

**데이터의 구조가 거의 또는 전혀 없는 대용량의 데이터를 저장하는 경우** <br />

대부분의 NoSQL 데이터베이스는 저장할 수 있는 데이터 유형에 제한을 설정하지 않는다. 필요에 따라서 데이터의 새 유형을 추가할 수 있다. 그렇기 때문에 소프트웨어 개발에 정형화 되지 않은 많은 양의 데이터가 필요한 경우, NoSQL을 적용하는 것이 효율적일 수 있다.

<p style="display: block; margin-top: 0px; margin-bottom: 20px" > </p>

**클라우드 컴퓨팅 및 저장공간을 최대한 활용하는 경우** <br />

클라우드 기반으로 데이터베이스 저장소를 구축하면 저렴한 비용의 솔류션을 제공 받을 수 있다. 소프트웨어에 데이터베이스의 확장성이 중요하다면 여러 데이터 센터에 걸쳐서 많은 번거로움 없이 확장할 수 있는 NoSQL 데이터베이스를 사용하는 것이 좋다.

<p style="display: block; margin-top: 0px; margin-bottom: 20px" > </p>

**빠르게 서비스를 구축하고 데이터 구조를 자주 업데이트 하는 경우** <br />

NoSQL 데이터베이스의 경우 스키마를 미리 준비할 필요가 없기 때문에 빠르게 개발하는 과정에 매우 유용하다. 시장에 빠르게 프로토타입을 출시해야 하는 경우가 해당할 수 있다. 또한 소프트웨어 버전별로 많은 다운타임 없이 데이터 구조를 자주 업데이트 해야하는 경우, 관계형 데이터베이스는 스키마 수정 등으로 많은 어려움이 있다. 그럴때 NoSQL 기반의 비관계형 데이터베이스를 사용하면 좋다.

<p style="display: block; margin-top: 0px; margin-bottom: 32px" > </p>

`참고한 레퍼런스` <br />

- [문서형 데이터베이스](https://aws.amazon.com/ko/nosql/document/)
- [데이터베이스 트랜젝션](https://mommoo.tistory.com/62)

<p style="display: block; margin-top: 0px; margin-bottom: 32px" > </p>
