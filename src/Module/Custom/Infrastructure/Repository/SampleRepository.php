<?php

namespace App\Module\Custom\Infrastructure\Repository;

use App\Module\Custom\Domain\Entity\Sample;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Sample>
 *
 * @method Sample|null find($id, $lockMode = null, $lockVersion = null)
 * @method Sample|null findOneBy(array $criteria, array $orderBy = null)
 * @method Sample[]    findAll()
 * @method Sample[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class SampleRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Sample::class);
    }
}
